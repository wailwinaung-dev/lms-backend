import { CreateSessionHistoryInput } from './create-session-history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSessionHistoryInput extends PartialType(CreateSessionHistoryInput) {
  @Field(() => Int)
  id: number;
}
