// src/notifications/notifications.controller.ts
import { Controller, Post, Get, Patch, Param, Body, Delete } from '@nestjs/common';
import { NotificationsService } from './notification.service'; 
import { CreateNotificationDto } from './dtos/create-notification.dto'; 

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  @Get('email/:email')
findAllByEmail(@Param('email') email: string) {
  return this.notificationsService.findAllByUser(email);
}


  @Patch('mark-read/:id')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
