import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';

interface IRequestTag {
  name: string;
}

class CreateTagService {
  async execute({ name }: IRequestTag) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error('Incorrect name!');
    }

    const tagAlreadyExist = await tagsRepositories.findOne({ name });

    if (tagAlreadyExist) {
      throw new Error('Tag already exist');
    }

    const tag = tagsRepositories.create({
      name,
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
