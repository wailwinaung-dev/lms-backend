import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateSessionHistoryInput {
  @Field(() => ID, { description: 'Companion id' })
  companion_id: string;
}
