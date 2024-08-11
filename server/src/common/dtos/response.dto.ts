import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseDto {
  @Field()
  status: boolean;

  @Field()
  message: string;
}
