import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CommentsService } from './comments.service.js';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(@Body() body: { eventId: string, occurrenceDate: string, userId: string, content: string }) {
    return this.commentsService.addComment(
      body.eventId, 
      new Date(body.occurrenceDate), 
      body.userId, 
      body.content
    );
  }

  @Get()
  async getComments(@Query('eventId') eventId: string, @Query('occurrenceDate') occurrenceDate: string) {
    return this.commentsService.getComments(eventId, new Date(occurrenceDate));
  }
}
