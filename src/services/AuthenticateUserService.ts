import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositiries';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}
class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }

    const passwordMacth = await compare(password, user.password);

    if (!passwordMacth) {
      throw new Error('Email/Password incorrect');
    }

    const token = sign(
      {
        email: user.email,
      },
      '177a3cb915313f883c0a5fad0e12d5fe',
      { subject: user.id, expiresIn: '1d' },
    );

    return token;
  }
}

export { AuthenticateUserService };
