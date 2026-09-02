import { Module } from '@nestjs/common';
import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TasksModule], // We need TasksService
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
