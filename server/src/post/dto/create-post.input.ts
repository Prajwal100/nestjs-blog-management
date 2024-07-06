import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { STATUS } from 'src/common/constants';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'Post name', nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  summary: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  authorId?: number;

  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  tagIds: number[];

  @Field(() => STATUS, { nullable: false })
  @IsNotEmpty()
  @IsEnum(STATUS)
  status: STATUS;
}
