import { Module } from '@nestjs/common';
import { ParcelTrackingService } from './parcel-tracking.service';
import { ParcelTrackingController } from './parcel-tracking.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { MailService } from 'src/mail/mail.service';
import { NotificationsService } from 'src/notification/notification.service';

@Module({
  controllers: [ParcelTrackingController],
  providers: [ParcelTrackingService, GeocodingService, PrismaService,MailService,NotificationsService],
})
export class ParcelTrackingModule {}

