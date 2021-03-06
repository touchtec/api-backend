import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface RequestDTO {
    provider_id: string;
    date: Date;  
    user_id: string;  
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        ){}

    public async execute({ date, provider_id, user_id }: RequestDTO): Promise<Appointment> {

        const appointmentDate =  startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
    

    if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
        provider_id,
        user_id,
        date: appointmentDate,
    });

    return appointment;

    }
}

export default CreateAppointmentService;