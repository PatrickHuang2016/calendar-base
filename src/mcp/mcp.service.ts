import { Injectable } from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { TasksService } from '../tasks/tasks.service.js';
import { z } from 'zod';

@Injectable()
export class McpService {
  private server: McpServer;
  private transport?: SSEServerTransport;

  constructor(private tasksService: TasksService) {
    this.server = new McpServer({
      name: 'CalendarBase',
      version: '1.0.0'
    });

    this.registerTools();
  }

  private registerTools() {
    this.server.tool(
      'calendar_get_today_tasks',
      'Get tasks for today including virtual and delayed tasks',
      {
        userId: z.string().describe('User ID to get tasks for'),
        date: z.string().describe('Date string in YYYY-MM-DD format')
      },
      async ({ userId, date }) => {
        const result = await this.tasksService.getTasksForDate(userId, date);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }
    );

    this.server.tool(
      'calendar_mark_task_completed',
      'Mark a task as completed',
      {
        eventId: z.string(),
        assigneeId: z.string(),
        occurrenceDate: z.string(),
        isDelayed: z.boolean()
      },
      async ({ eventId, assigneeId, occurrenceDate, isDelayed }) => {
        const result = await this.tasksService.completeTask(eventId, assigneeId, new Date(occurrenceDate), isDelayed);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }
    );
  }

  async handleSse(res: any) {
    this.transport = new SSEServerTransport('/mcp/messages', res);
    await this.server.connect(this.transport);
  }

  async handleMessage(req: any, res: any) {
    if (this.transport) {
      await this.transport.handlePostMessage(req, res);
    } else {
      res.status(500).send('SSE transport not initialized');
    }
  }
}
