import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Query('userId') userId: string, @Query('date') date: string) {
    return this.tasksService.getTasksForDate(userId, date);
  }

  @Post('delay')
  async delayTask(@Body() body: { eventId: string, assigneeId: string, originalDate: string, targetDate: string }) {
    return this.tasksService.delayTask(body.eventId, body.assigneeId, new Date(body.originalDate), new Date(body.targetDate));
  }

  @Post('complete')
  async completeTask(@Body() body: { eventId: string, assigneeId: string, occurrenceDate: string, isDelayed: boolean }) {
    return this.tasksService.completeTask(body.eventId, body.assigneeId, new Date(body.occurrenceDate), body.isDelayed);
  }
}
