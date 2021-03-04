import AppError from '@shared/errors/AppError';
import FakeAppointmetsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmetsRepository = new FakeAppointmetsRepository();
        const createAppointmet = new CreateAppointmentService(fakeAppointmetsRepository);

        const appointment = await createAppointmet.execute({
            date: new Date(),
            provider_id: '123456',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const fakeAppointmetsRepository = new FakeAppointmetsRepository();
        const createAppointmet = new CreateAppointmentService(fakeAppointmetsRepository);

        const appointmentDate = new Date(2021, 2, 4, 10, 30);

        await createAppointmet.execute({
            date: appointmentDate,
            provider_id: '123456',
        });

        expect(createAppointmet.execute({
            date: appointmentDate,
            provider_id: '123456',
        })).rejects.toBeInstanceOf(AppError);
    });
});