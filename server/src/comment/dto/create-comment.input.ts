import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/common/constants';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  content: string;

  @Field(()=>Int, { nullable: false})
  @IsInt()
  @IsNotEmpty()
  postId:number;

  @Field(()=>Int, { nullable: false})
  @IsInt()
  @IsNotEmpty()
  userId:number;

  @Field(() => STATUS, { nullable: true})
  @IsOptional()
  status: STATUS
}
