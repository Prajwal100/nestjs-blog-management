import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommnetInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
