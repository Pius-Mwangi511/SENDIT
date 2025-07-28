import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chome } from './chome';

describe('Chome', () => {
  let component: Chome;
  let fixture: ComponentFixture<Chome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
