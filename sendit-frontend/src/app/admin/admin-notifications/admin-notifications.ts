import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification  } from '../../services/notifications';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/ahome">Home</button>
        <button class="p-5" routerLink="/aservices">Services</button>
        <button class="p-5" routerLink="/adash">Admin Dashboard</button>
        <button class="p-5" routerLink="/acontact">Contact Us</button>
        <button class="p-5" routerLink="/aabout">About Us</button>
      </div>
      <button class="p-5" (click)="logout()">Log Out</button>
    </div>

    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
        <div class="flex justify-center my-7">
          <button routerLink="/profile">
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full" />
          </button>
        </div>
        <div class="px-5 pt-5">
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/adash">Dash Overview</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/acreate">Create Parcel</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/amanage">Manage Parcel</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/arequests">Sent Requests</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/ausers">Users</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/anotification">Notifications</button>
        </div>
      </div>

      <div class="border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5 w-[1000px]">
        <span class="flex justify-center text-center mt-5">
          <h1 class="font-bold text-xl">Notifications</h1>
        </span>
        <div class="p-5 mt-5 space-y-4" *ngIf="notifications.length > 0; else noNotifications">
          <div *ngFor="let note of notifications" class="border rounded-lg p-4 bg-gray-100 shadow">
            <p><strong>Type:</strong> {{ note.type }}</p>
            <p><strong>Message:</strong> {{ note.message }}</p>
            <p class="text-sm text-gray-600"><strong>Date:</strong> {{ note.createdAt | date:'short' }}</p>
          </div>
        </div>
        <ng-template #noNotifications>
          <p class="p-5 text-center text-gray-400">No notifications to show.</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: ``
})
export class AdminNotifications implements OnInit {
  notifications: Notification[] = [];

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    let email = localStorage.getItem('userEmail');

    // Fallback: extract from user if email not found
    if (!email) {
      const userRaw = localStorage.getItem('user');
      if (userRaw) {
        try {
          const user = JSON.parse(userRaw);
          email = user.email;
        } catch (e) {
          console.error('Failed to parse user from localStorage:', e);
        }
      }
    }

    console.log('Loaded userEmail:', email);

    if (email) {
      this.notificationService.getUserNotifications(email).subscribe({
        next: (data) => {
          console.log('Fetched notifications:', data);
          this.notifications = data;
        },
        error: (err) => console.error('Error loading notifications:', err)
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    console.log('logged out');
  }
}
