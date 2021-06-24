import { Request, Response } from 'express';
import { CreateComplimenteService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_sender, user_receiver, message } = request.body;

    const createComplimenteService = new CreateComplimenteService();

    const compliment = await createComplimenteService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
