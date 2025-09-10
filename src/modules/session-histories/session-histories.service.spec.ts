import { Test, TestingModule } from '@nestjs/testing';
import { SessionHistoriesService } from './session-histories.service';

describe('SessionHistoriesService', () => {
  let service: SessionHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionHistoriesService],
    }).compile();

    service = module.get<SessionHistoriesService>(SessionHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
