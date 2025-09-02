import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanionInput {
  @Field(() => String, { description: 'The name of the companion' })
  name: string;

  @Field(() => String, { description: 'The subject of the companion' })
  subject: string;

  @Field(() => String, { description: 'The topic of the companion' })
  topic: string;

  @Field(() => String, { description: 'The style of the companion' })
  style: string;

  @Field(() => String, { description: 'The voice of the companion' })
  voice: string;

  @Field(() => Int, { description: 'The duration of the companion' })
  duration: number;
}
