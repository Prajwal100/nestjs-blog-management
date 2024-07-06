import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { STATUS } from 'src/common/constants';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;

  @Field(() => STATUS, { nullable: false })
  @IsNotEmpty()
  @IsEnum(STATUS)
  status: STATUS;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  icon: string;
}
