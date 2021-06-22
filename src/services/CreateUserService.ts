import { UsersRepositories } from '../repositories/UsersRepositiries';
import { getCustomRepository } from 'typeorm';
interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}
class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorreto');
    }

    const userAlreadyExist = await usersRepository.findOne({ email });

    if (userAlreadyExist) {
      throw new Error('User already Exist');
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
