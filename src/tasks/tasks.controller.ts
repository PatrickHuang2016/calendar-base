import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('Tasks (日常待办管理)')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: '获取某用户在指定日期的所有待办任务 (合并虚拟与推迟任务)' })
  @ApiQuery({ name: 'userId', type: 'string', description: '用户唯一标识' })
  @ApiQuery({ name: 'date', type: 'string', description: '查询日期, 例如 2026-09-02' })
  async getTasks(@Query('userId') userId: string, @Query('date') date: string) {
    return this.tasksService.getTasksForDate(userId, date);
  }

  @Post('delay')
  @ApiOperation({ summary: '推迟某个任务到未来的指定日期 (写入缓冲队列)' })
  @ApiBody({ schema: { type: 'object', properties: { eventId: { type: 'string' }, assigneeId: { type: 'string' }, originalDate: { type: 'string' }, targetDate: { type: 'string' } } } })
  async delayTask(@Body() body: { eventId: string, assigneeId: string, originalDate: string, targetDate: string }) {
    return this.tasksService.delayTask(body.eventId, body.assigneeId, new Date(body.originalDate), new Date(body.targetDate));
  }

  @Post('complete')
  @ApiOperation({ summary: '标记任务为完成 (移出队列，写入历史归档日志)' })
  @ApiBody({ schema: { type: 'object', properties: { eventId: { type: 'string' }, assigneeId: { type: 'string' }, occurrenceDate: { type: 'string' }, isDelayed: { type: 'boolean' } } } })
  async completeTask(@Body() body: { eventId: string, assigneeId: string, occurrenceDate: string, isDelayed: boolean }) {
    return this.tasksService.completeTask(body.eventId, body.assigneeId, new Date(body.occurrenceDate), body.isDelayed);
  }
}
