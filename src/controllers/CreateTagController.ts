import { Request, Response } from 'express';
import CreateTagService from '../services/CreateTagService';

class CreateTagController {
  async store(request: Request, response: Response) {
    const { name } = request.body;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return response.status(201).json(tag);
  }
}

export default CreateTagController;
