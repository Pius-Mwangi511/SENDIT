import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acontact } from './acontact';

describe('Acontact', () => {
  let component: Acontact;
  let fixture: ComponentFixture<Acontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acontact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
