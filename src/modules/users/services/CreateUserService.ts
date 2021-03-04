import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,        
      ){}

    public async execute({ name, email, password }: RequestDTO): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPaswword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPaswword,
        });

        return user;
    }
}

export default CreateUserService;