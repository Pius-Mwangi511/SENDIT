import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { ParcelTrackingService } from './parcel-tracking.service';
import { CreateParcelTrackingDto } from './dtos/create-parcelTracking.dto'; 
import { UpdateParcelTrackingDto } from './dtos/update-parcelTracking.dto'; 

@Controller('tracking')
export class ParcelTrackingController {
  constructor(private readonly trackingService: ParcelTrackingService) {}

  @Post()
  create(@Body() dto: CreateParcelTrackingDto) {
    return this.trackingService.create(dto);
  }

  @Get()
  findAll() {
    return this.trackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParcelTrackingDto) {
    return this.trackingService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(id);
  }
}
