import { TestBed } from '@angular/core/testing';

import { ParcelTracking } from './parcel-tracking';

describe('ParcelTracking', () => {
  let service: ParcelTracking;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelTracking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
