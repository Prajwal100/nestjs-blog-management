import { Test, TestingModule } from '@nestjs/testing';
import { CommnetService } from './commnet.service';

describe('CommnetService', () => {
  let service: CommnetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommnetService],
    }).compile();

    service = module.get<CommnetService>(CommnetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
