import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Events (主任务配置)')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: '创建一个新的主任务 (支持 RRule 循环规则)' })
  @ApiBody({ schema: { type: 'object', properties: { creatorId: { type: 'string' }, title: { type: 'string' }, rrule: { type: 'string', description: '如 FREQ=DAILY' } } } })
  async createEvent(@Body() createEventDto: any) {
    return this.eventsService.createEvent(createEventDto);
  }
}
