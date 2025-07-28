import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationService, Notification } from '../../../services/notifications'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/chome">Home</button>
        <button class="p-5" routerLink="/cservices">Services</button>
        <button class="p-5" routerLink="/cordb">Courier Dashboard</button>
        <button class="p-5" routerLink="/ccontact">Contact Us</button>
        <button class="p-5" routerLink="/cabout">About Us</button>
      </div>
      <button class="p-5" routerLink="/home">Log Out</button>
    </div>

    <hr>

    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
        <div class="flex justify-center my-7">
          <button routerLink="/profile">
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
          </button>
        </div>
        <div class="px-5 pt-5">
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/cordb">Dashboard overview</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/cnotification">Notification</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/all-supplies">All Supplies</button>
          <button class="text-white font-bold active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/update-location">Update Location</button>
        </div>
      </div>

      <div class="border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5 w-[900px]">
        <h1 class="font-bold text-xl text-center mt-5">Notifications</h1>
        <div class="p-5 space-y-4 mt-5">
          <div *ngFor="let notification of notifications" class="border rounded-lg p-4 shadow bg-white">
            <p class="text-sm text-gray-700">{{ notification.message }}</p>
            <p class="text-xs text-gray-400 mt-1">Type: {{ notification.type }} | {{ notification.createdAt | date:'short' }}</p>
            <div *ngIf="!notification.read" class="mt-2">
              <button class="text-blue-600 text-sm hover:underline" (click)="markRead(notification.id)">Mark as Read</button>
            </div>
          </div>
          <p *ngIf="notifications.length === 0" class="text-center text-gray-500">No notifications available.</p>
        </div>
      </div>
    </div>
  `
})
export class CNotifications implements OnInit {
  private notificationService = inject(NotificationService);
  notifications: Notification[] = [];

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
  
  

  markRead(notificationId: string) {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notif = this.notifications.find(n => n.id === notificationId);
        if (notif) notif.read = true;
      },
      error: (err) => console.error('Failed to mark as read:', err)
    });
  }
}
