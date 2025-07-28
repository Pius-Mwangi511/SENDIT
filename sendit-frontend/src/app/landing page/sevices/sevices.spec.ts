import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sevices } from './sevices';

describe('Sevices', () => {
  let component: Sevices;
  let fixture: ComponentFixture<Sevices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sevices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sevices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
