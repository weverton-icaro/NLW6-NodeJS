import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    //Verificar se o email existe
    const user = await usersRepositories.findOneOrFail({ email });

    if (!user) {
      throw new Error('Email/Password incorrect.');
    }

    //Verificar se a senha está correta
    const passwordVerify = await compare(password, user.password);

    if (!passwordVerify) {
      throw new Error('Email/Password incorrect.');
    }

    //Gerando o token
    const token = sign(
      {
        email: user.email,
      },
      '63560e5232d03070bac988e1ffb43872',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  }
}

export default AuthenticateUserService;
