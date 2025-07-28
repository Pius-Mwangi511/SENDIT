import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParcel } from './view-parcel';

describe('ViewParcel', () => {
  let component: ViewParcel;
  let fixture: ComponentFixture<ViewParcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewParcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewParcel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
