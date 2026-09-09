import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header. Must use Bearer token.');
    }

    const apiKey = authHeader.split(' ')[1];
    const app = await this.prisma.app.findUnique({
      where: { apiKey }
    });

    if (!app) {
      throw new UnauthorizedException('Invalid API Key');
    }

    // Attach app to request
    request.appRecord = app;
    return true;
  }
}
