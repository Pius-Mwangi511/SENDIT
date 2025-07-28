import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [GeocodingModule],
  controllers: [ParcelController],
  providers: [ParcelService,MailService, PrismaService],
})
export class ParcelModule {}
