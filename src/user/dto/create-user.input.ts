import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters."})
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  avatar?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsIn([Role.ADMIN, Role.USER])
  role: Role;
}
