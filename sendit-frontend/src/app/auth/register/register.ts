import { Component } from '@angular/core';
import { Header } from '../../shared/component/header/header';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { AlertService } from '../../shared/alert-service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service'; 
import { RegisterDto } from '../../interfaces/auth.dtos'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Header, ReactiveFormsModule, CommonModule, RouterLink, AlertComponent],
  template: `
    <app-header></app-header>
    <app-alert></app-alert>

    <div class="flex justify-center mt-[70px] ">
      <div class="grid grid-cols-[500px,400px] gap-4 h-[600px] border-b-2 border border-black-600 rounded-2xl shadow-2xl">
        <div>
          <img src="assets/images/all.png" alt="" class=" brightness-50 border-2 border-black-600 rounded-2xl py-4">
        </div>

        <div>
          <h1 class="flex justify-center text-center text-xl font-bold my-4">Welcome to SendIT !</h1>
          <div class="flex justify-center text-center my-4">
            <div class="flex justify-center bg-[rgba(37,38,65,0.5)] border rounded-3xl w-[300px]">
              <button class="text-white px-2 py-1 my-2 rounded-2xl" routerLink="/login">Login</button>
              <button class="text-white bg-[rgba(37,38,65,1.0)]  px-2 py-1 my-2 rounded-2xl " routerLink="/register">Register</button>
            </div>
          </div>
          <p class="my-5">Experience safe and secure delivery of parcels</p>

          <div class="mr-2 bg-white rounded">
            <form [formGroup]="form" (ngSubmit)="register()">
              <label class="font-bold" for="email">Email Address</label><br>
              <input id="email" type="email" placeholder="Enter your Email Address" formControlName="email"
                class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl">
              <div *ngIf="form.get('email')?.touched && form.get('email')?.invalid" class="text-red-500 text-sm mb-2">
                Valid email is required
              </div>

              <label class="font-bold" for="username">User Name</label><br>
              <input id="username" type="text" placeholder="Enter your Username" formControlName="username"
                class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl">
              <div *ngIf="form.get('username')?.touched && form.get('username')?.invalid" class="text-red-500 text-sm mb-2">
                Username is required
              </div>

              <label class="font-bold" for="phone">Phone Number</label><br>
              <input id="phone" type="text" placeholder="Enter your Phone number" formControlName="phone"
                class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl">
              <div *ngIf="form.get('phone')?.touched && form.get('phone')?.invalid" class="text-red-500 text-sm mb-2">
                Phone number is required
              </div>

              <label class="font-bold" for="password">Password</label><br>
              <input id="password" type="password" placeholder="Enter your Password" formControlName="password"
                class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl">
              <div *ngIf="form.get('password')?.touched && form.get('password')?.invalid" class="text-red-500 text-sm mb-2">
                Password must be at least 6 characters
              </div>

              <button type="submit" [disabled]="form.invalid || isLoading"
                class="bg-[rgba(37,38,65,1.0)] text-white px-10 py-1 hover:bg-[rgba(37,38,65,0.8)] rounded-2xl text-white flex justify-center ml-[250px] disabled:opacity-50">
                {{ isLoading ? 'Registering...' : 'Register' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Register {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService // ✅ Inject AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.form.valid) {
      this.isLoading = true;
      const dto: RegisterDto = this.form.value;

      this.authService.register(dto).subscribe({
        next: () => {
          this.alertService.showAlert('Successfully registered, verify your email.', 'success');
          this.router.navigate(['/verify-email']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.alertService.showAlert('Registration failed. Please try again.', 'error');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
