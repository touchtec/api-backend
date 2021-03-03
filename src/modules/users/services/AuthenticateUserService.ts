import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    constructor(private usersRepository: IUsersRepository){}

    public async execute({ email, password}: RequestDTO): Promise<Response> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Incorret email/password combination', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Incorret email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ }, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };

    }

}

export default AuthenticateUserService;