import { Module } from '@nestjs/common';
import { SessionHistoriesService } from './session-histories.service';
import { SessionHistoriesResolver } from './session-histories.resolver';

@Module({
  providers: [SessionHistoriesResolver, SessionHistoriesService],
})
export class SessionHistoriesModule {}
