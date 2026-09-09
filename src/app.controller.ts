import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@ApiTags('App (系统根节点)')
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '系统健康检查', description: '返回简单的 Hello 字符串，通常用于监控系统是否存活' })
  getHello(): string {
    return this.appService.getHello();
  }
}
