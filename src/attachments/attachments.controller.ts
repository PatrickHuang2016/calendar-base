import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AttachmentsService } from './attachments.service.js';


@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  async addAttachment(@Body() body: { eventId: string, occurrenceDate?: string, fileUrl: string }) {
    // If occurrenceDate is missing, it's a global attachment
    const date = body.occurrenceDate ? new Date(body.occurrenceDate) : null;
    return this.attachmentsService.addAttachment(body.eventId, date, body.fileUrl);
  }

  @Get()
  async getAttachments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate?: string) {
    const date = occurrenceDate ? new Date(occurrenceDate) : null;
    return this.attachmentsService.getAttachments(eventId, date);
  }
}
