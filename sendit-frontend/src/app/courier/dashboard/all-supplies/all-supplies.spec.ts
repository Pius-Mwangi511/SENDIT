import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSupplies } from './all-supplies';

describe('AllSupplies', () => {
  let component: AllSupplies;
  let fixture: ComponentFixture<AllSupplies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSupplies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSupplies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
