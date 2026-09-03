import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { AttachmentsService } from './attachments.service.js';
import { CreateAttachmentDto } from '../dto/api.dto.js';

@ApiTags('Attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @ApiOperation({ summary: '添加附件' })
  @ApiBody({ type: CreateAttachmentDto })
  async addAttachment(@Body() body: CreateAttachmentDto) {
    return this.attachmentsService.addAttachment(body.eventId, null, body.url);
  }

  @Get()
  @ApiOperation({ summary: '获取附件列表' })
  @ApiQuery({ name: 'eventId', required: true, description: '事件ID' })
  @ApiQuery({ name: 'occurrenceDate', required: false, description: '发生日期' })
  async getAttachments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate?: string) {
    const date = occurrenceDate ? new Date(occurrenceDate) : null;
    return this.attachmentsService.getAttachments(eventId, date);
  }
}

