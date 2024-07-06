import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { FileUpload } from 'graphql-upload';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import slugify from 'slugify';
import { join } from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createPostInput: CreatePostInput, image?: FileUpload) {
    let imagePath: string;
    if (image) {
      try {
        imagePath = await this.saveImage(image);
      } catch (error) {
        throw new InternalServerErrorException('Failed to save image');
      }
    }
    const { name, categoryId, authorId, tagIds, ...postData } = createPostInput;
    const slug = slugify(name, { lower: true });

    const author = await this.userRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      throw new Error('Author not found.');
    }

    let category: Category = null;

    if (categoryId) {
      category = await this.categoryRepository.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new Error('Category not found.');
      }
    }

    const tags = tagIds
      ? await this.tagRepository.findBy({
          id: In(tagIds),
        })
      : [];

    console.log(postData);

    const post = this.postRepository.create({
      ...postData,
      name,
      slug,
      category,
      author,
      tags,
      image: imagePath,
    });
    return this.postRepository.save(post);
  }

  private async saveImage(image: FileUpload): Promise<string> {
    const filename = `${uuidv4()}-${image.filename}`;
    const imagePath = join(__dirname, '../../uploads', filename);

    await fs.writeFile(imagePath, await image.createReadStream());

    return filename;
  }

  findAll() {
    return this.postRepository.find({
      relations: ['category', 'author', 'tags'],
    });
  }

  findOne(id: number) {
    const post = this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['category', 'author', 'tags'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
    return post;
  }

  async update(
    id: number,
    updatePostInput: UpdatePostInput,
    image?: FileUpload,
  ) {
    const post = await this.findOne(id);

    Object.assign(post, updatePostInput);

    if (updatePostInput.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: {
          id: updatePostInput.categoryId,
        },
      });
      if (!category) {
        throw new NotFoundException('Category not found.');
      }
      post.category = category;
    }

    if (updatePostInput.tagIds) {
      const tags = await this.tagRepository.findBy({
        id: In(updatePostInput.tagIds),
      });
      post.tags = tags;
    }

    if (image) {
      try {
        const imagePath = await this.saveImage(image);
        post.image = imagePath;
      } catch (error) {
        throw new InternalServerErrorException('Failed to save image');
      }
    }

    return await this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
  }
}
