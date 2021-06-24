import { UsersRepositories } from '../repositories/UsersRepositiries';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}
class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorreto');
    }

    const userAlreadyExist = await usersRepository.findOne({ email });

    if (userAlreadyExist) {
      throw new Error('User already Exist');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
