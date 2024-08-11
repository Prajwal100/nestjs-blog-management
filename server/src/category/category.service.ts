import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { join } from 'path';
import { FileUpload } from 'graphql-upload';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ResponseDto } from 'src/common/dtos/response.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryInput: CreateCategoryInput, image: FileUpload) {
    let imagePath: string;
    if (image) {
      try {
        imagePath = await this.saveImage(image);
      } catch (error) {
        throw new InternalServerErrorException('Failed to save image');
      }
    }
    const { name } = createCategoryInput;
    const slug = slugify(name, { lower: true });

    const newCategory = this.categoryRepository.create({
      ...createCategoryInput,
      slug,
      icon: imagePath,
    });
    return await this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find({
      order:{
        createdAt: "DESC"
      }
    });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
    image?: FileUpload,
  ) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    if (image) {
      const imagePath = await this.saveImage(image);
      updateCategoryInput.icon = imagePath;
    }
    this.categoryRepository.update(id, updateCategoryInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<ResponseDto> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
    await this.categoryRepository.delete(id);

    return {
      status:true,
      message: "Category removed successfully."
    };
  }

  private async saveImage(image: FileUpload): Promise<string> {
    const filename = `${uuidv4()}-${image.filename}`;
    const imagePath = join(__dirname, '../../uploads', filename);

    await fs.writeFile(imagePath, await image.createReadStream());

    return filename;
  }
}
