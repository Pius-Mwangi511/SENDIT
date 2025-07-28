import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManUsers } from './admin-man-users';

describe('AdminManUsers', () => {
  let component: AdminManUsers;
  let fixture: ComponentFixture<AdminManUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
