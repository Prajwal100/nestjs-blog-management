import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommnetService } from './commnet.service';
import { Commnet } from './entities/commnet.entity';
import { CreateCommnetInput } from './dto/create-commnet.input';
import { UpdateCommnetInput } from './dto/update-commnet.input';

@Resolver(() => Commnet)
export class CommnetResolver {
  constructor(private readonly commnetService: CommnetService) {}

  @Mutation(() => Commnet)
  createCommnet(@Args('createCommnetInput') createCommnetInput: CreateCommnetInput) {
    return this.commnetService.create(createCommnetInput);
  }

  @Query(() => [Commnet], { name: 'commnet' })
  findAll() {
    return this.commnetService.findAll();
  }

  @Query(() => Commnet, { name: 'commnet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commnetService.findOne(id);
  }

  @Mutation(() => Commnet)
  updateCommnet(@Args('updateCommnetInput') updateCommnetInput: UpdateCommnetInput) {
    return this.commnetService.update(updateCommnetInput.id, updateCommnetInput);
  }

  @Mutation(() => Commnet)
  removeCommnet(@Args('id', { type: () => Int }) id: number) {
    return this.commnetService.remove(id);
  }
}
