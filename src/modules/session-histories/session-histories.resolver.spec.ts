import { Test, TestingModule } from '@nestjs/testing';
import { SessionHistoriesResolver } from './session-histories.resolver';
import { SessionHistoriesService } from './session-histories.service';

describe('SessionHistoriesResolver', () => {
  let resolver: SessionHistoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionHistoriesResolver, SessionHistoriesService],
    }).compile();

    resolver = module.get<SessionHistoriesResolver>(SessionHistoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
