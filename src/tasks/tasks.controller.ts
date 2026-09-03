import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { TasksService } from './tasks.service.js';
import { DelayTaskDto, CompleteTaskDto } from '../dto/api.dto.js';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: '获取指定日期的任务列表' })
  @ApiQuery({ name: 'userId', required: true, description: '用户ID' })
  @ApiQuery({ name: 'date', required: true, description: '日期 (YYYY-MM-DD)' })
  async getTasks(@Query('userId') userId: string, @Query('date') date: string) {
    return this.tasksService.getTasksForDate(userId, date);
  }

  @Post('delay')
  @ApiOperation({ summary: '延期任务' })
  @ApiBody({ type: DelayTaskDto })
  async delayTask(@Body() body: DelayTaskDto) {
    return this.tasksService.delayTask(body.eventId, body.assigneeId, new Date(body.originalDate), new Date(body.targetDate));
  }

  @Post('complete')
  @ApiOperation({ summary: '完成任务' })
  @ApiBody({ type: CompleteTaskDto })
  async completeTask(@Body() body: CompleteTaskDto) {
    return this.tasksService.completeTask(body.eventId, body.assigneeId, new Date(body.occurrenceDate), body.isDelayed ?? false);
  }

}


