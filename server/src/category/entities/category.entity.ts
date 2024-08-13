import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { STATUS } from 'src/common/constants';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

registerEnumType(STATUS, {
  name: 'STATUS',
});
@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false, unique: true })
  slug: string;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true })
  icon?: string;

  @Field(() => STATUS)
  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status: STATUS;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.category)
  posts?: Post[];

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
