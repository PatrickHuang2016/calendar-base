import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service.js';
import { CreateEventDto } from '../dto/api.dto.js';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: '获取日程/事件列表', description: '获取所有的主任务配置，可选按创建者或接入方筛选' })
  @ApiQuery({ name: 'creatorId', required: false, description: '创建者用户ID' })
  @ApiQuery({ name: 'appId', required: false, description: '接入应用的 App ID' })
  async getEvents(@Query('creatorId') creatorId?: string, @Query('appId') appId?: string) {
    return this.eventsService.getEvents(creatorId, appId);
  }


  @Post()
  @ApiOperation({ summary: '创建日程/事件', description: '创建一个新的主任务 (支持 RRule 循环规则)' })
  @ApiBody({ type: CreateEventDto })
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }
}



