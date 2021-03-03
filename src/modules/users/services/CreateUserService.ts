import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepository){}

    public async execute({ name, email, password }: RequestDTO): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPaswword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPaswword,
        });

        return user;
    }
}

export default CreateUserService;