import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { McpService } from './mcp.service.js';


@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  @Get('sse')
  async sse(@Res() res: any) {
    await this.mcpService.handleSse(res);
  }

  @Post('messages')
  async messages(@Req() req: any, @Res() res: any) {
    await this.mcpService.handleMessage(req, res);
  }
}
