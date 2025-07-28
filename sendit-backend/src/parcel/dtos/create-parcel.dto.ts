import { IsString, IsEmail, IsEnum, IsNumber } from 'class-validator';
import { ParcelCategory } from '@prisma/client';

export class CreateParcelDto {
  @IsEmail()
  senderEmail: string;

  @IsEmail()
  receiverEmail: string;

  @IsEmail()
  courierEmail?: string;

  @IsNumber()
  weight: number;

  @IsEnum(ParcelCategory)
  category: ParcelCategory;

  @IsString()
  pickupAddress: string;

  @IsString()
  destinationAddress: string;
}
