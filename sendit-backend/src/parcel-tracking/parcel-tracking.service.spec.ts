import { Test, TestingModule } from '@nestjs/testing';
import { ParcelTrackingService } from './parcel-tracking.service';

describe('ParcelTrackingService', () => {
  let service: ParcelTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelTrackingService],
    }).compile();

    service = module.get<ParcelTrackingService>(ParcelTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
