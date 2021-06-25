import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { classToPlain } from 'class-transformer';

class ListTagService {
  async execute() {
    const tagsRepositoeries = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositoeries.find();

    return classToPlain(tags);
  }
}

export { ListTagService };
