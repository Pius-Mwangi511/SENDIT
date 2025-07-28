import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSentRequests } from './admin-sent-requests';

describe('AdminSentRequests', () => {
  let component: AdminSentRequests;
  let fixture: ComponentFixture<AdminSentRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSentRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSentRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
