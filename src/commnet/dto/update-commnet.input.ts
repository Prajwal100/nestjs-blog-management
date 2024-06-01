import { CreateCommnetInput } from './create-commnet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommnetInput extends PartialType(CreateCommnetInput) {
  @Field(() => Int)
  id: number;
}
