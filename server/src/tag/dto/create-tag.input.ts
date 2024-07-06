import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { STATUS } from 'src/common/constants';

@InputType()
export class CreateTagInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => STATUS, { nullable: false })
  @IsNotEmpty()
  status: STATUS;
}
