import { Injectable } from '@nestjs/common';
import { CreateCompanionInput } from './dto/create-companion.input';
import { UpdateCompanionInput } from './dto/update-companion.input';

@Injectable()
export class CompanionsService {
  create(createCompanionInput: CreateCompanionInput) {
    return 'This action adds a new companion';
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
