import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '张三' })
  username!: string;
}

export class CreateEventDto {
  @ApiPropertyOptional({ description: '接入方应用ID / App ID', example: 'app_a1b2c3d4-e5f6-7890' })
  appId?: string;

  @ApiProperty({ description: '创建者用户ID', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab' })
  creatorId!: string;

  @ApiProperty({ description: '日程/事件标题', example: '团队每周例会' })
  title!: string;

  @ApiPropertyOptional({ description: '日程/事件详细描述', example: '讨论下一季度的路线图与关键里程碑' })
  description?: string;

  @ApiPropertyOptional({ description: 'RRule 重复规则字符串 (如: FREQ=WEEKLY;BYDAY=MO)', example: 'FREQ=WEEKLY;BYDAY=MO' })
  rrule?: string;

  @ApiPropertyOptional({ description: '指派的人员用户ID列表', example: ['user_uuid_1', 'user_uuid_2'] })
  assigneeIds?: string[];
}

export class DelayTaskDto {
  @ApiProperty({ description: '事件ID', example: 'evt_a1b2c3d4-e5f6-7890' })
  eventId!: string;

  @ApiProperty({ description: '指派对象/负责人用户ID', example: 'user_a1b2c3d4-e5f6-7890' })
  assigneeId!: string;

  @ApiProperty({ description: '原预计执行日期 (YYYY-MM-DD)', example: '2026-09-02' })
  originalDate!: string;

  @ApiProperty({ description: '延期后的目标执行日期 (YYYY-MM-DD)', example: '2026-09-05' })
  targetDate!: string;

  @ApiPropertyOptional({ description: '覆盖覆盖数据/重写字段 (JSON格式)', example: { title: '延期开会' } })
  overrideData?: Record<string, any>;
}

export class CompleteTaskDto {
  @ApiProperty({ description: '事件ID', example: 'evt_a1b2c3d4-e5f6-7890' })
  eventId!: string;

  @ApiProperty({ description: '指派对象/负责人用户ID', example: 'user_a1b2c3d4-e5f6-7890' })
  assigneeId!: string;

  @ApiProperty({ description: '任务发生/实例执行日期 (YYYY-MM-DD)', example: '2026-09-02' })
  occurrenceDate!: string;

  @ApiPropertyOptional({ description: '是否为延期队列中任务的完成', example: false, default: false })
  isDelayed?: boolean;

  @ApiPropertyOptional({ description: '状态完成标记 (completed 或 skipped)', example: 'completed', default: 'completed' })
  status?: string;
}

export class CreateCommentDto {
  @ApiProperty({ description: '关联的事件ID', example: 'evt_a1b2c3d4-e5f6-7890' })
  eventId!: string;

  @ApiProperty({ description: '评论关联的特定日程实例日期 (YYYY-MM-DD)', example: '2026-09-02' })
  occurrenceDate!: string;

  @ApiProperty({ description: '评论发布者用户ID', example: 'user_a1b2c3d4-e5f6-7890' })
  userId!: string;

  @ApiProperty({ description: '评论文本内容', example: '请大家准时参加。' })
  content!: string;
}

export class CreateAttachmentDto {
  @ApiProperty({ description: '关联的事件ID', example: 'evt_a1b2c3d4-e5f6-7890' })
  eventId!: string;

  @ApiPropertyOptional({ description: '指定特定日程实例日期 (未传则为事件通用全局附件)', example: '2026-09-02' })
  occurrenceDate?: string;

  @ApiProperty({ description: '附件文件URL/下载链接', example: 'https://example.com/files/document.pdf' })
  fileUrl!: string;
}

export class CreateReminderDto {
  @ApiProperty({ description: '关联的事件ID', example: 'evt_a1b2c3d4-e5f6-7890' })
  eventId!: string;

  @ApiProperty({ description: '提前提醒的分钟数', example: 15 })
  minutesBefore!: number;
}

