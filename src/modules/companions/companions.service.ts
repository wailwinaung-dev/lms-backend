import { Injectable } from '@nestjs/common';
import { CreateCompanionInput } from './dto/create-companion.input';
import { UpdateCompanionInput } from './dto/update-companion.input';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CompanionsService {
  constructor(private prisma: PrismaService) {}
  create(createCompanionInput: CreateCompanionInput) {
    const updatedInput = {
      ...createCompanionInput,
      author: 'testing',
    };
    return this.prisma.companions.create({ data: updatedInput });
  }

  findAll() {
    return `This action returns all companions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companion`;
  }

  update(id: number, updateCompanionInput: UpdateCompanionInput) {
    return `This action updates a #${id} companion`;
  }

  remove(id: number) {
    return `This action removes a #${id} companion`;
  }
}
