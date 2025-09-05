import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanionsService } from './companions.service';
import { Companion, CompanionConnection } from './entities/companion.entity';
import { CreateCompanionInput } from './dto/create-companion.input';
import { UpdateCompanionInput } from './dto/update-companion.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

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

  @Query(() => CompanionConnection, { name: 'companions' })
  findAll(@Args() paginationArg: PaginationArgs) {
    console.log(paginationArg);
    return this.companionsService.findAll(paginationArg);
  }

  @Query(() => Companion, { name: 'companion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companionsService.findOne(id);
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
