import { Module } from '@nestjs/common';
import { CompanionsService } from './companions.service';
import { CompanionsResolver } from './companions.resolver';

@Module({
  providers: [CompanionsResolver, CompanionsService],
})
export class CompanionsModule {}
