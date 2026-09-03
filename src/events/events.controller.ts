import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { EventsService } from './events.service.js';
import { CreateEventDto } from '../dto/api.dto.js';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: '获取日程/事件列表' })
  @ApiQuery({ name: 'creatorId', required: false, description: '创建者用户ID' })
  async getEvents(@Query('creatorId') creatorId?: string) {
    return this.eventsService.getEvents(creatorId);
  }

  @Post()
  @ApiOperation({ summary: '创建日程/事件' })
  @ApiBody({ type: CreateEventDto })
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }
}



