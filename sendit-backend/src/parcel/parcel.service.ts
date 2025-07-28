import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParcelDto } from './dtos/create-parcel.dto'; 
import { UpdateParcelDto } from './dtos/update-parcel.dto'; 
import { GeocodingService } from '../geocoding/geocoding.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ParcelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geocodingService: GeocodingService,
    private readonly mailService: MailService
  ) {}

  async create(dto: CreateParcelDto) {
    const sender = await this.prisma.user.findUnique({
      where: { email: dto.senderEmail },
    });
    if (!sender) throw new Error('Sender not found');

    const receiver = await this.prisma.user.findUnique({
      where: { email: dto.receiverEmail },
    });
    if (!receiver) throw new Error('Receiver not found');

    let courierId: string | null = null;
    let courierEmail: string | null = null;

    if (dto.courierEmail) {
      const courier = await this.prisma.user.findUnique({
        where: { email: dto.courierEmail },
      });
      if (!courier) throw new Error('Courier not found');
      courierId = courier.id;
      courierEmail = courier.email;

      // ✅ Notify Courier
      await this.mailService.send(
        courierEmail,
        'New Parcel Assigned',
        `Hello ${courier.name},<br><br>You have been assigned a new parcel.<br>Pickup: ${dto.pickupAddress}<br>Delivery: ${dto.destinationAddress}<br><br>Regards,<br>SendIT`
      );
    }

    const pickupCoords = await this.geocodingService.getCoordinates(dto.pickupAddress);
    const destinationCoords = await this.geocodingService.getCoordinates(dto.destinationAddress);

    return this.prisma.parcel.create({
      data: {
        weight: dto.weight,
        category: dto.category,
        pickupAddress: dto.pickupAddress,
        destinationAddress: dto.destinationAddress,
        pickupLat: pickupCoords.lat,
        pickupLng: pickupCoords.lng,
        destinationLat: destinationCoords.lat,
        destinationLng: destinationCoords.lng,
        senderId: sender.id,
        receiverId: receiver.id,
        courierId: courierId,
      },
    });
  }

  async findAll() {
    return this.prisma.parcel.findMany({
      include: {
        sender: true,
        receiver: true,
        courier: true,
      },
    });
  }

  async findOne(id: string) {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
        courier: true,
      },
    });
    if (!parcel) throw new NotFoundException('Parcel not found');
    return parcel;
  }

  async update(id: string, dto: UpdateParcelDto) {
    const parcel = await this.prisma.parcel.findUnique({
      where: { id },
      include: { sender: true },
    });
  
    if (!parcel) throw new NotFoundException('Parcel not found');
  
    let courierId: string | undefined;
  
    if (dto.courierEmail) {
      const courier = await this.prisma.user.findUnique({
        where: { email: dto.courierEmail },
      });
      if (!courier) throw new NotFoundException('Courier not found');
      courierId = courier.id;
  
      // Notify Courier
      await this.mailService.send(
        courier.email,
        'Parcel Assignment Updated',
        `Hello ${courier.name},<br><br>You have been assigned a parcel.<br>Pickup: ${dto.pickupAddress ?? parcel.pickupAddress}<br>Destination: ${dto.destinationAddress ?? parcel.destinationAddress}<br><br>Regards,<br>SendIT`
      );
    }
  
    const updatedParcel = await this.prisma.parcel.update({
      where: { id },
      data: {
        ...dto,
        courierId: courierId,
      },
    });
  
    //  Notify Sender if status changed
    if (dto.status) {
      await this.mailService.send(
        parcel.sender.email,
        'Parcel Status Update',
        `Hello ${parcel.sender.name},<br><br>Your parcel with ID <strong>${parcel.id}</strong> has been updated.<br>Status: <strong>${dto.status}</strong>.<br><br>Regards,<br>SendIT`
      );
    }
  
    return updatedParcel;
  }
  

  //  New method for direct courier assignment
  async assignCourier(parcelId: string, courierEmail: string) {
    const parcel = await this.findOne(parcelId);
    const courier = await this.prisma.user.findUnique({
      where: { email: courierEmail },
    });
    if (!courier) throw new NotFoundException('Courier not found');

    // ✅ Notify Courier
    await this.mailService.send(
      courier.email,
      'Parcel Assigned',
      `Hello ${courier.name},<br><br>You have been assigned a parcel.<br>Pickup: ${parcel.pickupAddress}<br>Destination: ${parcel.destinationAddress}<br><br>Regards,<br>SendIT`
    );

    return this.prisma.parcel.update({
      where: { id: parcelId },
      data: {
        courierId: courier.id,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.parcel.delete({ where: { id } });
  }
}
