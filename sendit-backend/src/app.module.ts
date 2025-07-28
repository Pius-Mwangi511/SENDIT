import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ Import this
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ParcelModule } from './parcel/parcel.module';
import { ParcelTrackingModule } from './parcel-tracking/parcel-tracking.module';
import { NotificationsModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { GeocodingService } from './geocoding/geocoding.service';
import { GeocodingModule } from './geocoding/geocoding.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UserModule,
    ParcelModule,
    ParcelTrackingModule,
    NotificationsModule,
    AuthModule,
    MailModule,
    GeocodingModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, GeocodingService],
})
export class AppModule {}
