import { ArgsType, Int, Field } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

@ArgsType()
export class FilterCompanionArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  filter: string;

  @Field(() => String, { nullable: true })
  subject: string;
}
