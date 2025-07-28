import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uservice } from './uservice';

describe('Uservice', () => {
  let component: Uservice;
  let fixture: ComponentFixture<Uservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uservice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uservice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
