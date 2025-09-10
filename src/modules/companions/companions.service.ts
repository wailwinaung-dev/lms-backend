import { Injectable } from '@nestjs/common';
import { CreateCompanionInput } from './dto/create-companion.input';
import { UpdateCompanionInput } from './dto/update-companion.input';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { PageInfo } from 'src/common/pagination/pagination-connection';
import { FilterCompanionArgs } from './dto/filter-companion.args';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CompanionsService {
  constructor(private prisma: PrismaService) {}
  create(createCompanionInput: CreateCompanionInput, id: string) {
    const updatedInput = {
      ...createCompanionInput,
      author: id,
    };
    return this.prisma.companions.create({ data: updatedInput });
  }

  async findAll(args: FilterCompanionArgs) {
    const { first, after, last, before, filter, subject } = args;

    const where: Prisma.CompanionsWhereInput = {};

    if (filter) {
      where.OR = [
        { name: { contains: filter, mode: 'insensitive' } },
        { topic: { contains: filter, mode: 'insensitive' } },
      ];
    }

    if (subject) {
      where.subject = { equals: subject };
    }

    const take = first ?? last ?? 9;
    let cursor: any = undefined;
    let skip: number | undefined = undefined;
    let orderBy: any = [{ createdAt: 'desc' }, { id: 'desc' }];

    // Forward pagination
    if (after) {
      cursor = after ? { id: after } : undefined;
      skip = 1;
    }

    // Backward pagination
    if (before) {
      cursor = before ? { id: before } : undefined;
      skip = 1;
      orderBy = [{ createdAt: 'asc' }, { id: 'asc' }];
    }

    const rowsPlusOne = await this.prisma.companions.findMany({
      take: take + 1,
      skip,
      cursor,
      orderBy,
      where, // desc
    });

    const hasExtra = rowsPlusOne.length > take;
    const companions = rowsPlusOne.slice(0, take); // trim extra
    // If we reversed the order (before), put back into ascending
    const items = before ? companions.reverse() : companions;

    const edges = items.map((c) => ({
      node: c,
      cursor: c.id.toString(),
    }));

    const pageInfo = {
      startCursor: edges.length > 0 ? edges[0].cursor : null,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
      hasNextPage: before ? Boolean(before) : hasExtra,
      hasPreviousPage: before ? hasExtra : Boolean(after),
    };

    return { edges, pageInfo };
  }

  findOne(id: string) {
    return this.prisma.companions.findUnique({ where: { id } });
  }

  findByUser(userId: string) {
    return this.prisma.companions.findMany({
      where: { author: userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  totalCountByUser(userId: string) {
    return this.prisma.companions.count({ where: { author: userId } });
  }

  update(id: number, updateCompanionInput: UpdateCompanionInput) {
    return `This action updates a #${id} companion`;
  }

  remove(id: number) {
    return `This action removes a #${id} companion`;
  }
}
