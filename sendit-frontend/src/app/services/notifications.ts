// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'STATUS_UPDATE' | 'WELCOME' | 'DELIVERY' | 'SYSTEM'; 
  message: string;
  userId: string;
  read: boolean;
  createdAt: string;
}


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  createNotification(data: { type: string; message: string; userId: string }): Observable<Notification> {
    return this.http.post<Notification>(this.baseUrl, data);
  }

  getUserNotifications(email: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`http://localhost:3000/notifications/email/${email}`);
  }
  

  markAsRead(notificationId: string): Observable<Notification> {
    return this.http.patch<Notification>(`${this.baseUrl}/mark-read/${notificationId}`, {});
  }

  deleteNotification(notificationId: string): Observable<Notification> {
    return this.http.delete<Notification>(`${this.baseUrl}/${notificationId}`);
  }
}
