import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { McpService } from './mcp.service.js';


@ApiTags('MCP Server')
@ApiBearerAuth()
@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  @Get('sse')
  @ApiOperation({ summary: '建立 SSE 连接', description: '建立 Server-Sent Events (SSE) 长连接，供 AI Agent 接入' })
  async sse(@Res() res: any) {
    await this.mcpService.handleSse(res);
  }

  @Post('messages')
  @ApiOperation({ summary: '发送 MCP 消息', description: '接收 AI Agent 通过 MCP 协议发送的指令与消息' })
  async messages(@Req() req: any, @Res() res: any) {
    await this.mcpService.handleMessage(req, res);
  }
}
