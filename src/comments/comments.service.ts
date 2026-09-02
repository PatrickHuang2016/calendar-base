import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async addComment(eventId: string, occurrenceDate: Date, userId: string, content: string) {
    return this.prisma.comment.create({
      data: {
        eventId,
        occurrenceDate,
        userId,
        content
      }
    });
  }

  async getComments(eventId: string, occurrenceDate: Date) {
    return this.prisma.comment.findMany({
      where: {
        eventId,
        occurrenceDate
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        user: {
          select: { username: true } // Return commenter's name
        }
      }
    });
  }
}
