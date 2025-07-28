import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uabout } from './uabout';

describe('Uabout', () => {
  let component: Uabout;
  let fixture: ComponentFixture<Uabout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uabout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uabout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
