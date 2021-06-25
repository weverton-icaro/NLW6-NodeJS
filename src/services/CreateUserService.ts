import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect');
    }

    if (!password) {
      throw new Error('Password is request.');
    }

    if (!name) {
      throw new Error('Name is request.');
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
