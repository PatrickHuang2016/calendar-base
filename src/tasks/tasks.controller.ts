import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service.js';
import { DelayTaskDto, CompleteTaskDto } from '../dto/api.dto.js';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: '获取指定日期的任务列表', description: '获取某用户在指定日期的所有待办任务 (合并虚拟与推迟任务)' })
  @ApiQuery({ name: 'userId', required: true, description: '用户ID' })
  @ApiQuery({ name: 'date', required: true, description: '日期 (YYYY-MM-DD)' })
  async getTasks(@Query('userId') userId: string, @Query('date') date: string) {
    return this.tasksService.getTasksForDate(userId, date);
  }

  @Post('delay')
  @ApiOperation({ summary: '延期任务', description: '推迟某个任务到未来的指定日期 (写入缓冲队列)' })
  @ApiBody({ type: DelayTaskDto })
  async delayTask(@Body() body: DelayTaskDto) {
    return this.tasksService.delayTask(body.eventId, body.assigneeId, new Date(body.originalDate), new Date(body.targetDate));
  }

  @Post('complete')
  @ApiOperation({ summary: '完成任务', description: '标记任务为完成 (移出队列，写入历史归档日志)' })
  @ApiBody({ type: CompleteTaskDto })
  async completeTask(@Body() body: CompleteTaskDto) {
    return this.tasksService.completeTask(body.eventId, body.assigneeId, new Date(body.occurrenceDate), body.isDelayed ?? false);
  }

}


