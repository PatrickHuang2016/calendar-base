import { Module } from '@nestjs/common';
import { McpController } from './mcp.controller.js';
import { McpService } from './mcp.service.js';
import { TasksModule } from '../tasks/tasks.module.js';


@Module({
  imports: [TasksModule], // We need TasksService
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
