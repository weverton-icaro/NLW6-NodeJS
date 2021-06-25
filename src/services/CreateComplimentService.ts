import { getCustomRepository } from 'typeorm';
import ComplimentsRepositories from '../repositories/ComplimentsRepositories';
import UsersRepositories from '../repositories/UsersRepositories';

interface IComplimentRequest {
  user_receiver: string;
  user_sender: string;
  message: string;
  tag_id: string;
}

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    message,
    tag_id,
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error('User cannot praise himself.');
    }

    const userReceiver = await usersRepositories.findOneOrFail(user_receiver);

    if (!userReceiver) {
      throw new Error('User receiver does not exists!');
    }

    const Compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(Compliment);

    return Compliment;
  }
}

export default CreateComplimentService;
