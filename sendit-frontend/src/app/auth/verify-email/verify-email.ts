import { Component } from '@angular/core';
import { Header } from '../../shared/component/header/header';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AlertService } from '../../shared/alert-service';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { AuthService } from '../../services/auth-service'; 

@Component({
  selector: 'app-verify-email',
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
          <h1 class="flex justify-center text-center text-xl font-bold my-4">Email Verification</h1>
          <p class="my-5 mb-10 text-sm text-center">Enter the token sent to your email to verify your account</p>
          <div class="mr-2 bg-white rounded pr-3">
            <form (ngSubmit)="verifyToken()">
              <label class="font-bold" for="token">Verification Token</label><br>
              <input id="token" type="text" placeholder="Enter your token" [(ngModel)]="form.token" name="token" class="w-[400px] my-1 p-2 mb-10 border border-black-600 rounded-2xl"><br>

              <button type="submit" class="bg-[rgba(37,38,65,1.0)] text-white px-10 py-1 rounded-2xl flex justify-center ml-[250px]">Verify</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class VerifyEmailComponent {
  form = {
    token: ''
  };

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  verifyToken() {
    if (!this.form.token) {
      this.alertService.showAlert('Please enter a token', 'error');
      return;
    }

    this.authService.verifyEmail({ token: this.form.token }).subscribe({
      next: () => {
        this.alertService.showAlert('Email verified successfully!', 'success');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        const msg = err?.error?.message || 'Verification failed. Try again.';
        this.alertService.showAlert(msg, 'error');
      }
    });
  }
}
