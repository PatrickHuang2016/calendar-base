import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';


@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  async addAttachment(eventId: string, occurrenceDate: Date | null, fileUrl: string) {
    return this.prisma.attachment.create({
      data: {
        eventId,
        occurrenceDate,
        fileUrl
      }
    });
  }

  async getAttachments(eventId: string, occurrenceDate: Date | null) {
    // If we query for a specific occurrence, we usually want to return 
    // BOTH the global attachments (occurrenceDate: null) AND the instance ones.
    const conditions: any = [{ eventId, occurrenceDate: null }];
    
    if (occurrenceDate) {
        conditions.push({ eventId, occurrenceDate });
    }

    return this.prisma.attachment.findMany({
      where: {
        OR: conditions
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}
