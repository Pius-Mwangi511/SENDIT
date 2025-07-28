// src/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { NotificationsController } from './notification.controller'; 
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService],
})
export class NotificationsModule {}

