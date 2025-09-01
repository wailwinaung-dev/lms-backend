import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanionsService } from './companions.service';
import { Companion } from './entities/companion.entity';
import { CreateCompanionInput } from './dto/create-companion.input';
import { UpdateCompanionInput } from './dto/update-companion.input';

@Resolver(() => Companion)
export class CompanionsResolver {
  constructor(private readonly companionsService: CompanionsService) {}

  @Mutation(() => Companion)
  createCompanion(@Args('createCompanionInput') createCompanionInput: CreateCompanionInput) {
    return this.companionsService.create(createCompanionInput);
  }

  @Query(() => [Companion], { name: 'companions' })
  findAll() {
    return this.companionsService.findAll();
  }

  @Query(() => Companion, { name: 'companion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companionsService.findOne(id);
  }

  @Mutation(() => Companion)
  updateCompanion(@Args('updateCompanionInput') updateCompanionInput: UpdateCompanionInput) {
    return this.companionsService.update(updateCompanionInput.id, updateCompanionInput);
  }

  @Mutation(() => Companion)
  removeCompanion(@Args('id', { type: () => Int }) id: number) {
    return this.companionsService.remove(id);
  }
}
