import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingService } from '../geocoding/geocoding.service';
import { CreateParcelTrackingDto } from './dtos/create-parcelTracking.dto'; 
import { UpdateParcelTrackingDto } from './dtos/update-parcelTracking.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ParcelTrackingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geoService: GeocodingService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateParcelTrackingDto) {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id: dto.parcelId },
      include: {
        sender: true,
        receiver: true,
      },
    });
  
    if (!parcel) throw new NotFoundException('Parcel not found');

    if (!dto.location || dto.location.trim() === '') {
        throw new NotFoundException('Location is required for tracking');
      }
  
    const coords = await this.geoService.getCoordinates(dto.location);
    if (!coords) throw new NotFoundException('Could not geocode location');
  
    const tracking = await this.prisma.parcelTracking.create({
      data: {
        parcelId: dto.parcelId,
        location: dto.location,
        latitude: coords.lat,
        longitude: coords.lng,
        statusNote: dto.statusNote,
      },
    });
  
    // Notify sender
    await this.mailService.send(
      parcel.sender.email,
      `Parcel Update - ${parcel.id}`,
      `<p>Hi ${parcel.sender.name},</p>
       <p>Your parcel is now at: <strong>${dto.location}</strong>.</p>
       <p>Status: ${dto.statusNote}</p>
       <p>Regards,<br>SendIT</p>`
    );
  
    // Notify receiver
    await this.mailService.send(
      parcel.receiver.email,
      `Parcel Update - ${parcel.id}`,
      `<p>Hi ${parcel.receiver.name},</p>
       <p>The parcel destined for you is now at: <strong>${dto.location}</strong>.</p>
       <p>Status: ${dto.statusNote}</p>
       <p>Regards,<br>SendIT</p>`
    );
  
    return tracking;
  }
  

  async findAll() {
    return this.prisma.parcelTracking.findMany({
      include: { parcel: true },
    });
  }

  async findOne(id: string) {
    const tracking = await this.prisma.parcelTracking.findUnique({
      where: { id },
      include: { parcel: true },
    });
    if (!tracking) throw new NotFoundException('Tracking entry not found');
    return tracking;
  }

  async update(id: string, dto: UpdateParcelTrackingDto) {
    await this.findOne(id); // Ensure it exists
  
    const updateData: any = { ...dto };
  
    if (dto.location) {
      const coords = await this.geoService.getCoordinates(dto.location);
      if (!coords) throw new NotFoundException('Could not geocode location');
      updateData.latitude = coords.lat;
      updateData.longitude = coords.lng;
    }
  
    const updatedTracking = await this.prisma.parcelTracking.update({
      where: { id },
      data: updateData,
    });
  
    // Fetch parcel + sender/receiver emails
    const parcel = await this.prisma.parcel.findUnique({
      where: { id: updatedTracking.parcelId },
      include: {
        sender: true,
        receiver: true,
      },
    });
  
    if (parcel?.sender?.email) {
        await this.mailService.send(
            parcel.sender.email,
            `Parcel Update - ${parcel.id}`,
            `<p>Hi ${parcel.sender.name},</p>
             <p>Your parcel is currently at: <strong>${dto.location}</strong>.</p>
             <p>Status: ${dto.statusNote}</p>
             <p>Regards,<br>SendIT</p>`
          );
          
    }
  
    if (parcel?.receiver?.email) {
        await this.mailService.send(
            parcel.receiver.email,
            `Parcel Update - ${parcel.id}`,
            `<p>Hi ${parcel.receiver.name},</p>
             <p>The parcel destined for you is currently at: <strong>${dto.location}</strong>.</p>
             <p>Status: ${dto.statusNote}</p>
             <p>Regards,<br>SendIT</p>`
          );
          
    }
  
    return updatedTracking;
  }
  

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.parcelTracking.delete({ where: { id } });
  }
}
