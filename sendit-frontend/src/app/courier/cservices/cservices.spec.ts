import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cservices } from './cservices';

describe('Cservices', () => {
  let component: Cservices;
  let fixture: ComponentFixture<Cservices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cservices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cservices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
