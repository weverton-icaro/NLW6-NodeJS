import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class CreateUserController {
  async store(request: Request, response: Response) {
    const { name, email, admin = false, password } = request.body;

    if (name === '') {
      throw new Error('Name cannot be empty!');
    }

    if (email === '') {
      throw new Error('Email incorrect!');
    }

    if (password === '') {
      throw new Error('Password cannot be empty!');
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      admin,
    });

    return response.status(201).json(user);
  }
}

export default CreateUserController;
