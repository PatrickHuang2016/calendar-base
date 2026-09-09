import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from './comments.service.js';
import { CreateCommentDto } from '../dto/api.dto.js';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: '创建/添加评论', description: '在指定任务的特定发生日期下添加留言' })
  @ApiBody({ type: CreateCommentDto })
  async addComment(@Body() body: CreateCommentDto) {
    return this.commentsService.addComment(
      body.eventId,
      new Date(body.occurrenceDate),
      body.userId,
      body.content
    );
  }


  @Get()
  @ApiOperation({ summary: '获取评论列表', description: '获取指定任务在特定发生日期下的所有留言' })
  @ApiQuery({ name: 'eventId', required: true, description: '事件ID' })
  @ApiQuery({ name: 'occurrenceDate', required: false, description: '发生日期' })
  async getComments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate?: string) {
    return this.commentsService.getComments(eventId, occurrenceDate ? new Date(occurrenceDate) : new Date());
  }
}

