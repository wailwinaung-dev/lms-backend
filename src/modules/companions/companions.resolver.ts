import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CompanionsService } from './companions.service';
import { Companion, CompanionConnection } from './entities/companion.entity';
import { CreateCompanionInput } from './dto/create-companion.input';
import { UpdateCompanionInput } from './dto/update-companion.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { FilterCompanionArgs } from './dto/filter-companion.args';
import { Public } from '../auth/auth.guard';

@Resolver(() => Companion)
export class CompanionsResolver {
  constructor(private readonly companionsService: CompanionsService) {}

  @Mutation(() => Companion)
  createCompanion(
    @Args('createCompanionInput') createCompanionInput: CreateCompanionInput,
    @CurrentUser('id') id: string,
  ) {
    return this.companionsService.create(createCompanionInput, id);
  }

  @Public()
  @Query(() => CompanionConnection, { name: 'companions', nullable: true })
  findAll(@Args() args: FilterCompanionArgs) {
    return this.companionsService.findAll(args);
  }

  @Query(() => Companion, { name: 'companion', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.companionsService.findOne(id);
  }

  @Query(() => [Companion], { name: 'companionsByUser', nullable: true })
  findByUser(@CurrentUser('id') userId: string) {
    return this.companionsService.findByUser(userId);
  }

  @Mutation(() => Companion)
  updateCompanion(
    @Args('updateCompanionInput') updateCompanionInput: UpdateCompanionInput,
  ) {
    return this.companionsService.update(
      updateCompanionInput.id,
      updateCompanionInput,
    );
  }

  @Mutation(() => Companion)
  removeCompanion(@Args('id', { type: () => Int }) id: number) {
    return this.companionsService.remove(id);
  }
}
