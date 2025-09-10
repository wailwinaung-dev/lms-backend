import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SessionHistory {
  @Field(() => String, { description: 'The id of the session history' })
  id: string;
  @Field(() => String, { description: 'The id of the user' })
  user_id: string;
  @Field(() => String, { description: 'The id of the companion' })
  companion_id: string;
  @Field(() => Date, {
    description: 'The creation date of the session history',
  })
  createdAt: Date;
}
