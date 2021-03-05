import { Request, Response} from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

//import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id , date, user_id } = request.body;

        const parsedDate = parseISO(date);

        //const appointmentsRepository = new AppointmentsRepository;  
        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id, user_id,});
        

        return response.json(appointment);

    //return response.status(400).json({ error: err.message })
    }

}