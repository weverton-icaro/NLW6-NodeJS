import { Request, Response } from 'express';
import CreateComplimentService from '../services/CreateComplimentService';

class CreateComplimentController {
  async store(request: Request, response: Response) {
    const { tag_id, message, user_receiver, user_sender } = request.body;

    if (user_receiver === '') {
      throw new Error('Receiver cannot empyt!');
    }

    if (user_sender === '') {
      throw new Error('Sender cannot empyt!');
    }

    if (tag_id === '') {
      throw new Error('Tag cannot empyt!');
    }

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    return response.status(201).json(compliment);
  }
}

export default CreateComplimentController;
