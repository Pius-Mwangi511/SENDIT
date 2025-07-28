import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ccontact } from './ccontact';

describe('Ccontact', () => {
  let component: Ccontact;
  let fixture: ComponentFixture<Ccontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ccontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ccontact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
