import { Injectable } from '@nestjs/common';
import { CreateSessionHistoryInput } from './dto/create-session-history.input';
import { UpdateSessionHistoryInput } from './dto/update-session-history.input';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class SessionHistoriesService {
  constructor(private prisma: PrismaService) {}
  create(createSessionHistoryInput: CreateSessionHistoryInput, userId: string) {
    return this.prisma.sessionHistory.create({
      data: {
        ...createSessionHistoryInput,
        user_id: userId,
      },
    });
  }

  findAll() {
    return this.prisma.sessionHistory.findMany({
      include: { Companion: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} sessionHistory`;
  }

  update(id: number, updateSessionHistoryInput: UpdateSessionHistoryInput) {
    return `This action updates a #${id} sessionHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} sessionHistory`;
  }
}
