import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';
import { CommnetModule } from './commnet/commnet.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    GraphqlModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TagModule,
    PostModule,
    CommnetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
