import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RRule, rrulestr } from 'rrule';
import { DateTime } from 'luxon';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getTasksForDate(userId: string, dateStr: string) {
    const targetDate = new Date(dateStr);
    
    // 1. Fetch recurring events assigned to this user
    // Note: for simplicity in MVP, we assume all events created by user are their tasks.
    const events = await this.prisma.event.findMany({
      where: { creatorId: userId }
    });

    const virtualTasks = [];
    for (const event of events) {
      if (event.rrule) {
        try {
          const rule = rrulestr(event.rrule);
          // Check if it occurs on targetDate
          const start = DateTime.fromJSDate(targetDate).startOf('day').toJSDate();
          const end = DateTime.fromJSDate(targetDate).endOf('day').toJSDate();
          const occurrences = rule.between(start, end, true);
          if (occurrences.length > 0) {
            virtualTasks.push({ ...event, isVirtual: true, occurrenceDate: targetDate });
          }
        } catch (e) {
          console.error("Invalid rrule", event.rrule);
        }
      } else {
        // One-off event logic could go here
      }
    }

    // 2. Fetch delayed tasks for this date
    const delayedTasks = await this.prisma.delayedTaskQueue.findMany({
      where: {
        assigneeId: userId,
        targetDate: targetDate
      },
      include: { event: true }
    });

    // 3. Fetch completed/skipped logs to filter out already done tasks
    const completedLogs = await this.prisma.eventAssignment.findMany({
      where: {
        assigneeId: userId,
        occurrenceDate: targetDate
      }
    });

    // Remove virtual tasks that are already completed
    const pendingVirtualTasks = virtualTasks.filter(vt => 
      !completedLogs.some(log => log.eventId === vt.id && !log.isDelayedCompletion)
    );

    // Remove virtual tasks that were delayed to another day!
    // (Need to check if a delayed queue item exists for this occurrenceDate)
    const delayedAway = await this.prisma.delayedTaskQueue.findMany({
        where: { assigneeId: userId, originalDate: targetDate }
    });

    const finalVirtualTasks = pendingVirtualTasks.filter(vt =>
      !delayedAway.some(d => d.eventId === vt.id)
    );

    return {
      normalTasks: finalVirtualTasks,
      delayedTasks: delayedTasks
    };
  }

  async delayTask(eventId: string, assigneeId: string, originalDate: Date, targetDate: Date) {
    return this.prisma.delayedTaskQueue.create({
      data: {
        eventId,
        assigneeId,
        originalDate,
        targetDate,
      }
    });
  }

  async completeTask(eventId: string, assigneeId: string, occurrenceDate: Date, isDelayed: boolean) {
    if (isDelayed) {
        // Remove from queue
        await this.prisma.delayedTaskQueue.deleteMany({
            where: { eventId, assigneeId, originalDate: occurrenceDate }
        });
    }

    // Add to historical log
    return this.prisma.eventAssignment.create({
      data: {
        eventId,
        assigneeId,
        occurrenceDate,
        status: 'completed',
        isDelayedCompletion: isDelayed
      }
    });
  }
}
