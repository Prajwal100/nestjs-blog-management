import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Commnet {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
