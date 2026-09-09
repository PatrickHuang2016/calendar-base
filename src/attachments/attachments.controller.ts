import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AttachmentsService } from './attachments.service.js';
import { CreateAttachmentDto } from '../dto/api.dto.js';

@ApiTags('Attachments')
@ApiBearerAuth()
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @ApiOperation({ summary: '添加附件', description: '上传附件并绑定到指定任务 (可选绑定到特定日期)' })
  @ApiBody({ type: CreateAttachmentDto })
  async addAttachment(@Body() body: CreateAttachmentDto) {
    const date = body.occurrenceDate ? new Date(body.occurrenceDate) : null;
    return this.attachmentsService.addAttachment(body.eventId, date, body.fileUrl);
  }


  @Get()
  @ApiOperation({ summary: '获取附件列表', description: '获取指定任务的附件 (自动包含全局附件与当期附件)' })
  @ApiQuery({ name: 'eventId', required: true, description: '事件ID' })
  @ApiQuery({ name: 'occurrenceDate', required: false, description: '发生日期' })
  async getAttachments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate?: string) {
    const date = occurrenceDate ? new Date(occurrenceDate) : null;
    return this.attachmentsService.getAttachments(eventId, date);
  }
}

