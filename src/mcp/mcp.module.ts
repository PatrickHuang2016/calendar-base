import { Module } from '@nestjs/common';
import { McpController } from './mcp.controller.js';
import { McpService } from './mcp.service.js';
import { TasksService } from '../tasks/tasks.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [McpController],
  providers: [McpService, TasksService, PrismaService],
})
export class McpModule {}

