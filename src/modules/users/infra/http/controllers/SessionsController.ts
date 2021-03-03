import { Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response>{
        const { email, password} = request.body;

        const usersRepository = new UsersRepository();
        const authenticateUser = new AuthenticateUserService(usersRepository);

        const { user, token }= await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });

        //return response.status(err.statusCode).json({ error: err.message })
    }
}