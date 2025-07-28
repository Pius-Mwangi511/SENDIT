import { TestBed } from '@angular/core/testing';

import { Parcels } from './parcels';

describe('Parcels', () => {
  let service: Parcels;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Parcels);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
