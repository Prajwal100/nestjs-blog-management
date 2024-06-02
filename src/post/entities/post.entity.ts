import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { STATUS } from 'src/common/constants';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class Post {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: false })
  @Column()
  name: string;

  @Field(() => String, { nullable: false })
  @Column({ unique: true })
  slug: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  summary: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  // @Field(()=>[Comment],{nullable:true})
  // @OneToMany(()=>Comment, comment => comment.post)
  // comments:Comment[];

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
  updatedAt: Date;
}
