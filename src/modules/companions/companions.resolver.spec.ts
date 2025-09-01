import { Test, TestingModule } from '@nestjs/testing';
import { CompanionsResolver } from './companions.resolver';
import { CompanionsService } from './companions.service';

describe('CompanionsResolver', () => {
  let resolver: CompanionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanionsResolver, CompanionsService],
    }).compile();

    resolver = module.get<CompanionsResolver>(CompanionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
