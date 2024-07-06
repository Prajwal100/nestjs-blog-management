import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query(() => [Tag], { name: 'tags' })
  findAll() {
    return this.tagService.findAll();
  }

  @Query(() => Tag, { name: 'tag' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findOne(id);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTagInput') updateTagInput: UpdateTagInput,
  ) {
    return await this.tagService.update(id, updateTagInput);
  }

  @Mutation(() => Boolean)
  async removeTag(@Args('id', { type: () => Int }) id: number) {
    await this.tagService.remove(id);
    return true;
  }
}
