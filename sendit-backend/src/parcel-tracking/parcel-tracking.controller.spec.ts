import { Test, TestingModule } from '@nestjs/testing';
import { ParcelTrackingController } from './parcel-tracking.controller';
import { ParcelTrackingService } from './parcel-tracking.service';

describe('ParcelTrackingController', () => {
  let controller: ParcelTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcelTrackingController],
      providers: [ParcelTrackingService],
    }).compile();

    controller = module.get<ParcelTrackingController>(ParcelTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
