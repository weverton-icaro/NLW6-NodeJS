import { Request, Response } from 'express';
import CreateComplimentService from '../services/CreateComplimentService';
import ListUserReceiveComplimentService from '../services/ListUserReceiveComplimentService';
import ListUserSendComplimentService from '../services/ListUserSendComplimentService';

class ComplimentController {
  async receive(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceiveComplimentService =
      new ListUserReceiveComplimentService();

    const compliments = await listUserReceiveComplimentService.execute(user_id);

    return response.status(200).json(compliments);
  }

  async sender(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentService = new ListUserSendComplimentService();

    const compliments = await listUserSendComplimentService.execute(user_id);

    return response.status(200).json(compliments);
  }

  async store(request: Request, response: Response) {
    const { tag_id, message, user_receiver } = request.body;
    const { user_id } = request;

    if (user_receiver === '') {
      throw new Error('Receiver cannot empyt!');
    }

    if (tag_id === '') {
      throw new Error('Tag cannot empyt!');
    }

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_receiver,
      user_sender: user_id,
      message,
    });

    return response.status(201).json(compliment);
  }
}

export default ComplimentController;
