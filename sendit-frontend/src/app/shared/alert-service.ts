// src/app/shared/services/alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AlertData {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertData | null>(null);
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string, type: AlertData['type'] = 'info') {
    this.alertSubject.next({ message, type });

    // Auto dismiss after 3s
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    this.alertSubject.next(null);
  }
}
