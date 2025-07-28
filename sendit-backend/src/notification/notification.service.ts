// src/notifications/notifications.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dtos/create-notification.dto'; 
import { UpdateNotificationDto } from './dtos/update-notification.dto'; 

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    let userId = dto.userId;
  
    // If email is provided instead of userId, look up the user
    if (!userId && dto.email) {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
  
      if (!user) throw new NotFoundException('User with this email not found');
      userId = user.id;
    }
  
    if (!userId) {
      throw new Error('Either userId or email must be provided to create a notification');
    }
  
    return this.prisma.notification.create({
      data: {
        type: dto.type,
        message: dto.message,
        user: { connect: { id: userId } },
      },
    });
  }
  

  async findAllByUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) throw new NotFoundException('User with this email not found');
  
    return this.prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }
  

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  async remove(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }
}

