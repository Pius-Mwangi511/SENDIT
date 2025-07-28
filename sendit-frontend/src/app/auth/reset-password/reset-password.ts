import { Component } from '@angular/core';
import { Header } from '../../shared/component/header/header'; 
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AlertService } from '../../shared/alert-service';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { AuthService } from '../../services/auth-service'; 

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [Header, FormsModule, AlertComponent],
  template: `
    <app-header></app-header>
    <app-alert></app-alert>
    <div class="flex justify-center mt-[70px]">
      <div class="grid grid-cols-[500px,400px] gap-3 h-[600px] border-b-2 border border-black-600 rounded-2xl shadow-2xl">
        <div class="bg-gradient-to-b from-[rgba(41,185,231,0.0)] via-[rgba(41,185,231,0.2)] to-[rgba(153,153,153,0.9)] border rounded-xl">
          <img src="assets/images/all.png" alt="" class="brightness-50 rounded-2xl py-4">
        </div>
        <div class="pr-3">
          <h1 class="flex justify-center text-center text-xl font-bold my-4">Reset Your Password</h1>
          <p class="my-2 mb-6 text-center">Enter the token you received and your new password.</p>
          <div class="mr-2 bg-white rounded pr-3">
            <form (ngSubmit)="resetPassword()">
              <label class="font-bold" for="token">Reset Token</label><br>
              <input id="token" type="text" placeholder="Enter reset token" [(ngModel)]="form.token" name="token" class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl"><br>

              <label class="font-bold" for="newPassword">New Password</label><br>
              <input id="newPassword" type="password" placeholder="Enter new password" [(ngModel)]="form.newPassword" name="newPassword" class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl"><br>

              <button type="submit" class="bg-[rgba(37,38,65,1.0)] text-white px-10 py-1 rounded-2xl flex justify-center ml-[250px]">Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ResetPasswordComponent {
  form = {
    token: '',
    newPassword: ''
  };

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  resetPassword() {
    if (!this.form.token || !this.form.newPassword) {
      this.alertService.showAlert('Please fill in both fields.', 'error');
      return;
    }

    this.authService.resetPassword(this.form).subscribe({
      next: () => {
        this.alertService.showAlert('Password reset successful!', 'success');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        const message = err?.error?.message || 'Reset failed. Please try again.';
        this.alertService.showAlert(message, 'error');
      }
    });
  }
}
