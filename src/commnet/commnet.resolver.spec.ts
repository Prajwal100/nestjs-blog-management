import { Test, TestingModule } from '@nestjs/testing';
import { CommnetResolver } from './commnet.resolver';
import { CommnetService } from './commnet.service';

describe('CommnetResolver', () => {
  let resolver: CommnetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommnetResolver, CommnetService],
    }).compile();

    resolver = module.get<CommnetResolver>(CommnetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
