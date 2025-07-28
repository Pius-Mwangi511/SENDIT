import { PartialType } from '@nestjs/mapped-types';
import { CreateParcelDto } from './create-parcel.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ParcelStatus } from '@prisma/client';

export class UpdateParcelDto extends PartialType(CreateParcelDto) {
  @IsOptional()
  @IsEnum(ParcelStatus)
  status?: ParcelStatus;
}
