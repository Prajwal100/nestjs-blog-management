import { ObjectType, Field, Int } from '@nestjs/graphql';
import { STATUS } from 'src/common/constants';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Comment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column()
  content: string;

  @Field(()=>Post, { nullable:true})
  @ManyToOne(() => Post, post => post.comments)
  post?: Post;

  @Field(()=> User, { nullable:true})
  @ManyToOne(()=> User, user => user.comments)
  user?: User;

  @Field(() => STATUS)
  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status: STATUS;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt: true;
}
