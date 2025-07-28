import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ucontact } from './ucontact';

describe('Ucontact', () => {
  let component: Ucontact;
  let fixture: ComponentFixture<Ucontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ucontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ucontact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
