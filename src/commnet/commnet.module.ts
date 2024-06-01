import { Module } from '@nestjs/common';
import { CommnetService } from './commnet.service';
import { CommnetResolver } from './commnet.resolver';

@Module({
  providers: [CommnetResolver, CommnetService],
})
export class CommnetModule {}
