import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationService, Notification  } from '../../services/notifications'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  template: `
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/uhome">Home</button>
        <button class="p-5" routerLink="/uservices">Services</button>
        <button class="p-5" routerLink="/mydb">My Dashboard</button>
        <button class="p-5" routerLink="/ucontact">Contact Us</button>
        <button class="p-5" routerLink="/uabout">About Us</button>
      </div>
      <button class="p-5" routerLink="/home">Log Out</button>
    </div>

    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
        <div class="flex justify-center my-7">
          <button routerLink="/profile">
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
          </button>
        </div>
        <div class="px-5 pt-5">
          <button class="text-white font-bold flex my-6" routerLink="/mydb">My Dashboard</button> 
          <button class="text-white font-bold flex my-6" routerLink="/sent">Sent</button>
          <button class="text-white font-bold flex my-6" routerLink="/received">Received</button>
          <button class="text-white font-bold flex my-6" routerLink="/notification">Notification</button>
          <button class="text-white font-bold flex my-6" routerLink="/create">+Create Parcel</button>
        </div>
      </div>

      <div class="border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5 p-5 w-full">
        <h1 class="font-bold text-xl text-center mb-4">Notifications</h1>
        <div *ngIf="notifications.length === 0" class="text-center">No notifications yet.</div>
        <div *ngFor="let notification of notifications" class="mb-4 border p-3 rounded-xl shadow bg-white">
          <p class="text-sm">{{ notification.message }}</p>
          <div class="text-xs text-gray-600 mb-2">Date: {{ notification.createdAt | date:'medium' }}</div>
          <div *ngIf="!notification.read">
            <button class="text-blue-500 hover:underline" (click)="markRead(notification.id)">Mark as Read</button>
          </div>
          <div *ngIf="notification.read" class="text-green-500 text-sm">✔ Read</div>
        </div>
      </div>
    </div>
  `
})
export class Notifications implements OnInit {
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

  markRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        this.notifications = this.notifications.map(n =>
          n.id === notificationId ? { ...n, isRead: true } : n
        );
      },
      error: (err) => console.error('Failed to mark notification as read', err)
    });
  }
}
