import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { ApiOperation, ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('Attachments (任务附件)')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @ApiOperation({ summary: '上传附件并绑定到指定任务 (可选绑定到特定日期)' })
  @ApiBody({ schema: { type: 'object', properties: { eventId: { type: 'string' }, occurrenceDate: { type: 'string' }, fileUrl: { type: 'string' } } } })
  async addAttachment(@Body() body: { eventId: string, occurrenceDate?: string, fileUrl: string }) {
    // If occurrenceDate is missing, it's a global attachment
    const date = body.occurrenceDate ? new Date(body.occurrenceDate) : null;
    return this.attachmentsService.addAttachment(body.eventId, date, body.fileUrl);
  }

  @Get()
  @ApiOperation({ summary: '获取指定任务的附件 (自动包含全局附件与当期附件)' })
  @ApiQuery({ name: 'eventId', type: 'string' })
  @ApiQuery({ name: 'occurrenceDate', type: 'string', required: false })
  async getAttachments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate?: string) {
    const date = occurrenceDate ? new Date(occurrenceDate) : null;
    return this.attachmentsService.getAttachments(eventId, date);
  }
}
