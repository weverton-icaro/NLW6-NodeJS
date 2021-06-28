import { Request, Response } from 'express';
import CreateTagService from '../services/CreateTagService';
import ListTagsService from '../services/ListTagsService';

class TagsController {
  async index(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    return response.status(200).json(tags);
  }

  async store(request: Request, response: Response) {
    const { name } = request.body;

    if (name === '') {
      throw new Error('Tag cannot be empty.');
    }

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return response.status(201).json(tag);
  }
}

export default TagsController;
