import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../shared/component/header/header'; 
import { AlertService } from '../../shared/alert-service';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { AuthService } from '../../services/auth-service'; 
import { ForgotPasswordDto } from '../../interfaces/auth.dtos';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [Header, FormsModule, RouterLink, AlertComponent],
  template: `
    <app-header></app-header>
    <app-alert></app-alert>
    <div class="flex justify-center mt-[70px]">
      <div class="grid grid-cols-[500px,400px] gap-3 h-[500px] border-b-2 border border-black-600 rounded-2xl shadow-2xl">
        <div class="bg-gradient-to-b from-[rgba(41,185,231,0.0)] via-[rgba(41,185,231,0.2)] to-[rgba(153,153,153,0.9)] border rounded-xl">
          <img src="assets/images/all.png" alt="" class="brightness-50 rounded-2xl py-4">
        </div>
        <div class="pr-3">
          <h1 class="flex justify-center text-center text-xl font-bold my-4">Forgot Password</h1>
          <div class="flex justify-center text-center my-4">
            <div class="flex justify-center bg-[rgba(37,38,65,0.5)] border rounded-3xl w-[300px]">
              <button class="text-white px-2 py-1 my-2 rounded-2xl" routerLink="/login">Back to Login</button>
            </div>
          </div>
          <p class="my-5 mb-10">Enter your email to reset your password</p>
          <div class="mr-2 bg-white rounded pr-3">
            <form (ngSubmit)="sendResetEmail()">
              <label class="font-bold" for="email">Email Address</label><br>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email"
                [(ngModel)]="email"
                name="email"
                class="w-[400px] my-1 p-2 mb-10 border border-black-600 rounded-2xl"
                required
              ><br>

              <button type="submit" class="bg-[rgba(37,38,65,1.0)] text-white px-10 py-1 rounded-2xl flex justify-center ml-[200px]">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ForgotPasswordComponent {
  email = '';

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService
  ) {}

  sendResetEmail() {
    const dto: ForgotPasswordDto = { email: this.email };

    this.authService.forgotPassword(dto).subscribe({
      next: () => {
        this.alertService.showAlert('Reset link sent to your email!', 'success');
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        console.error(err);
        this.alertService.showAlert('Failed to send reset link. Please try again.', 'error');
      }
    });
  }
}
