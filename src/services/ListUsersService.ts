import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositiries';

class ListUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const users = usersRepositories.find();

    return classToPlain(users);
  }
}

export { ListUsersService };
