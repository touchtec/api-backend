import { Request, Response} from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id , date } = request.body;

        const parsedDate = parseISO(date);

        const appointmentsRepository = new AppointmentsRepository;  
        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id});
        

        return response.json(appointment);

    //return response.status(400).json({ error: err.message })
    }

}