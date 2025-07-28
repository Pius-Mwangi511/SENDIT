import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uhome } from './uhome';

describe('Uhome', () => {
  let component: Uhome;
  let fixture: ComponentFixture<Uhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uhome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
