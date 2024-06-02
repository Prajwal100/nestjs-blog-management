import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(createTagInput: CreateTagInput) {
    const { name } = createTagInput;
    const slug = slugify(name, { lower: true });
    const createTag = this.tagRepository.create({ ...createTagInput, slug });
    return await this.tagRepository.save(createTag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    return this.tagRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTagInput: UpdateTagInput) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException('Tag not found.');
    }
    await this.tagRepository.update(id, updateTagInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    this.tagRepository.delete(id);
  }
}
