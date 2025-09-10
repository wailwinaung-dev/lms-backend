import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SessionHistoriesService } from './session-histories.service';
import { SessionHistory } from './entities/session-history.entity';
import { CreateSessionHistoryInput } from './dto/create-session-history.input';
import { UpdateSessionHistoryInput } from './dto/update-session-history.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Resolver(() => SessionHistory)
export class SessionHistoriesResolver {
  constructor(
    private readonly sessionHistoriesService: SessionHistoriesService,
  ) {}

  @Mutation(() => SessionHistory)
  createSessionHistory(
    @Args('createSessionHistoryInput')
    createSessionHistoryInput: CreateSessionHistoryInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.sessionHistoriesService.create(
      createSessionHistoryInput,
      userId,
    );
  }

  @Query(() => [SessionHistory], { name: 'sessionHistories' })
  findAll() {
    return this.sessionHistoriesService.findAll();
  }

  @Query(() => SessionHistory, { name: 'sessionHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sessionHistoriesService.findOne(id);
  }

  @Mutation(() => SessionHistory)
  updateSessionHistory(
    @Args('updateSessionHistoryInput')
    updateSessionHistoryInput: UpdateSessionHistoryInput,
  ) {
    return this.sessionHistoriesService.update(
      updateSessionHistoryInput.id,
      updateSessionHistoryInput,
    );
  }

  @Mutation(() => SessionHistory)
  removeSessionHistory(@Args('id', { type: () => Int }) id: number) {
    return this.sessionHistoriesService.remove(id);
  }
}
