import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
  ) {
    return this.categoryService.create(createCategoryInput, image);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
  ) {
    return this.categoryService.update(id, updateCategoryInput, image);
  }

  @Mutation(() => Boolean)
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    await this.categoryService.remove(id);
    return true;
  }
}
