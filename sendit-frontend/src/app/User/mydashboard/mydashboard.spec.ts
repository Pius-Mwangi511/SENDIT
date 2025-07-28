import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mydashboard } from './mydashboard';

describe('Mydashboard', () => {
  let component: Mydashboard;
  let fixture: ComponentFixture<Mydashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mydashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mydashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
