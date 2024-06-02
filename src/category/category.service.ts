import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryInput: CreateCategoryInput) {
    const { name, status } = createCategoryInput;
    const slug = slugify(name, { lower: true });

    const newCategory = await this.categoryRepository.create({
      ...createCategoryInput,
      slug,
    });
    return await this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
    this.categoryRepository.update(id, updateCategoryInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
    await this.categoryRepository.delete(id);
  }
}
