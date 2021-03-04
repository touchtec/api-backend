import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../services/CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john@exemplo.com',
            password: '1234',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        await createUser.execute({
            name: 'John Doe',
            email: 'john@exemplo.com',
            password: '1234',
        });

        expect(createUser.execute({
            name: 'John Doe',
            email: 'john@exemplo.com',
            password: '1234',
        })).rejects.toBeInstanceOf(AppError);
    });
});   