import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateParcelTrackingDto {
  @IsUUID()
  parcelId: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  statusNote?: string;
}
