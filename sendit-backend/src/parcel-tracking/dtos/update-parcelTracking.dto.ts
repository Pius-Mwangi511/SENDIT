import { PartialType } from '@nestjs/mapped-types';
import { CreateParcelTrackingDto } from './create-parcelTracking.dto'; 

export class UpdateParcelTrackingDto extends PartialType(CreateParcelTrackingDto) {}
