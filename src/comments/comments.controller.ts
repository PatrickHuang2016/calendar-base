import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('Comments (任务留言与打卡记录)')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: '在指定任务的特定发生日期下添加留言' })
  @ApiBody({ schema: { type: 'object', properties: { eventId: { type: 'string' }, occurrenceDate: { type: 'string' }, userId: { type: 'string' }, content: { type: 'string' } } } })
  async addComment(@Body() body: { eventId: string, occurrenceDate: string, userId: string, content: string }) {
    return this.commentsService.addComment(
      body.eventId, 
      new Date(body.occurrenceDate), 
      body.userId, 
      body.content
    );
  }

  @Get()
  @ApiOperation({ summary: '获取指定任务在特定发生日期下的所有留言' })
  @ApiQuery({ name: 'eventId', type: 'string' })
  @ApiQuery({ name: 'occurrenceDate', type: 'string' })
  async getComments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate: string) {
    return this.commentsService.getComments(eventId, new Date(occurrenceDate));
  }
}
