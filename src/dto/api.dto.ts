import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiPropertyOptional({ description: '接入方应用ID / App ID', example: 'app_a1b2c3d4-e5f6-7890' })
  appId?: string;

  @ApiProperty({ description: '创建者用户ID', example: 'user_123' })
  creatorId!: string;

  @ApiProperty({ description: '日程/事件标题', example: '团队每周例会' })
  title!: string;

  @ApiPropertyOptional({ description: '日程/事件详细描述', example: '讨论下一季度的路线图与关键里程碑' })
  description?: string;

  @ApiPropertyOptional({ description: 'RRule 重复规则字符串 (如: FREQ=WEEKLY;BYDAY=MO)', example: 'FREQ=WEEKLY;BYDAY=MO' })
  rrule?: string;
}


export class DelayTaskDto {
  @ApiProperty({ description: '事件ID', example: 'evt_123' })
  eventId!: string;

  @ApiProperty({ description: '指派对象/负责人ID', example: 'user_123' })
  assigneeId!: string;

  @ApiProperty({ description: '原预计执行日期 (YYYY-MM-DD)', example: '2026-09-02' })
  originalDate!: string;

  @ApiProperty({ description: '延期后的目标执行日期 (YYYY-MM-DD)', example: '2026-09-05' })
  targetDate!: string;
}

export class CompleteTaskDto {
  @ApiProperty({ description: '事件ID', example: 'evt_123' })
  eventId!: string;

  @ApiProperty({ description: '指派对象/负责人ID', example: 'user_123' })
  assigneeId!: string;

  @ApiProperty({ description: '任务发生/执行日期 (YYYY-MM-DD)', example: '2026-09-02' })
  occurrenceDate!: string;

  @ApiProperty({ description: '是否为延期任务的完成', example: false })
  isDelayed!: boolean;
}

export class CreateCommentDto {
  @ApiProperty({ description: '关联的事件ID', example: 'evt_123' })
  eventId!: string;

  @ApiProperty({ description: '评论发布者用户ID', example: 'user_123' })
  authorId!: string;

  @ApiProperty({ description: '评论文本内容', example: '请大家准时参加。' })
  content!: string;
}

export class CreateAttachmentDto {
  @ApiProperty({ description: '关联的事件ID', example: 'evt_123' })
  eventId!: string;

  @ApiProperty({ description: '附件文件名', example: 'document.pdf' })
  name!: string;

  @ApiProperty({ description: '附件链接/URL', example: 'https://example.com/files/document.pdf' })
  url!: string;
}
