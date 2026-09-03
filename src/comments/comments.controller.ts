import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CommentsService } from './comments.service.js';
import { CreateCommentDto } from '../dto/api.dto.js';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: '创建/添加评论' })
  @ApiBody({ type: CreateCommentDto })
  async addComment(@Body() body: CreateCommentDto) {
    return this.commentsService.addComment(
      body.eventId,
      new Date(),
      body.authorId,
      body.content
    );
  }

  @Get()
  @ApiOperation({ summary: '获取评论列表' })
  @ApiQuery({ name: 'eventId', required: true, description: '事件ID' })
  @ApiQuery({ name: 'occurrenceDate', required: false, description: '发生日期' })
  async getComments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate?: string) {
    return this.commentsService.getComments(eventId, occurrenceDate ? new Date(occurrenceDate) : new Date());
  }
}

