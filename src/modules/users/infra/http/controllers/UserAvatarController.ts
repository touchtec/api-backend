import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services//UpdateUserAvatarService';


export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response>{
        //const usersRepository = new UsersRepository();
        //const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        //delete user.password;

        return response.json(user);

        //return response.status(400).json({ error: err.message })       
    }
}