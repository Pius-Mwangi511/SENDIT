import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageParcels } from './admin-manage-parcels';

describe('AdminManageParcels', () => {
  let component: AdminManageParcels;
  let fixture: ComponentFixture<AdminManageParcels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageParcels]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageParcels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
