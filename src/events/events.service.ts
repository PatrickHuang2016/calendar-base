import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';


@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: { appId?: string, creatorId: string, title: string, description?: string, rrule?: string }) {
    return this.prisma.event.create({
      data: {
        appId: data.appId,
        creatorId: data.creatorId,
        title: data.title,
        description: data.description,
        rrule: data.rrule,
      }
    });
  }

  async getEvents(creatorId?: string, appId?: string) {
    return this.prisma.event.findMany({
      where: {
        ...(creatorId ? { creatorId } : {}),
        ...(appId ? { appId } : {}),
      },
      include: {
        assignments: true,
        comments: true,
        attachments: true,
      },
    });
  }
}


