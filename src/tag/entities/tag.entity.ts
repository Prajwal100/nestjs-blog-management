import { ObjectType, Field, Int } from '@nestjs/graphql';
import { STATUS } from 'src/common/constants';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: false })
  @Column()
  name: string;

  @Field(() => String, { nullable: false })
  @Column({ unique: true })
  slug: string;

  @Field(() => STATUS)
  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status: STATUS;

  @Field(() => [Post], { nullable: true })
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

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
  updatedAt: Date;
}
