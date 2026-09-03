import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';


@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: { creatorId: string, title: string, rrule?: string }) {
    return this.prisma.event.create({
      data: {
        creatorId: data.creatorId,
        title: data.title,
        rrule: data.rrule,
      }
    });
  }

  async getEvents(creatorId?: string) {

    return this.prisma.event.findMany({
      where: creatorId ? { creatorId } : {},
      include: {
        assignees: true,
        comments: true,
        attachments: true,
      },
    });
  }
}

