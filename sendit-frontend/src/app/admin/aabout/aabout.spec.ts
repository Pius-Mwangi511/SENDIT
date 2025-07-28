import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aabout } from './aabout';

describe('Aabout', () => {
  let component: Aabout;
  let fixture: ComponentFixture<Aabout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aabout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aabout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
