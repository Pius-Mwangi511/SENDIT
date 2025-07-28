// src/app/shared/components/alert.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertData, AlertService } from '../alert-service'; 
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `
    <div *ngIf="alert" [ngClass]="classes[alert.type]" class="p-3 mx-10 absolute rounded w-[200px]  text-white mb-4 text-center">
      {{ alert.message }}
    </div>
  `,
})
export class AlertComponent {
  alert: AlertData | null = null;
  sub!: Subscription;

  classes: Record<AlertData['type'], string> = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-500 text-black',
  };

  constructor(private alertService: AlertService) {
    this.sub = this.alertService.alert$.subscribe(data => {
      this.alert = data;
    });
  }
}
