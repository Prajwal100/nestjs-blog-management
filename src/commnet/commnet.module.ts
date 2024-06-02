import { Module } from '@nestjs/common';
import { CommnetService } from './commnet.service';
import { CommnetResolver } from './commnet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commnet } from './entities/commnet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commnet])],
  providers: [CommnetResolver, CommnetService],
})
export class CommnetModule {}
