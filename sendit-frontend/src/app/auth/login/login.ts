import { Component } from '@angular/core';
import { Header } from '../../shared/component/header/header'; 
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AlertService } from '../../shared/alert-service';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { AuthService } from '../../services/auth-service'; 
import {jwtDecode} from 'jwt-decode'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Header, FormsModule, RouterLink, AlertComponent],
  template: `
    <app-header></app-header>
    <app-alert></app-alert>
    <div class="flex justify-center mt-[70px] bg-greeen-600">
      <div class="grid grid-cols-[500px,400px] gap-3 h-[600px] border-b-2 border border-black-600 rounded-2xl  shadow-2xl">
        <div class="bg-gradient-to-b from-[rgba(41,185,231,0.0)] via-[rgba(41,185,231,0.2)] to-[rgba(153,153,153,0.9)] border rounded-xl">
          <img src="assets/images/all.png" alt="" class=" brightness-50  rounded-2xl py-4">
        </div>
        <div class="pr-3">
          <h1 class="flex justify-center text-center text-xl font-bold my-4">Welcome to SendIT!</h1>
          <div class="flex justify-center text-center my-4">
            <div class="flex justify-center bg-[rgba(37,38,65,0.5)] border rounded-3xl w-[300px]">
              <button class="text-white bg-[rgba(37,38,65,1.0)] px-2 py-1 my-2 rounded-2xl" routerLink="/login">Login</button>
              <button class="text-white px-2 py-1 my-2 rounded-2xl" routerLink="/register">Register</button>
            </div>
          </div>
          <p class="my-5 mb-10">Experience safe and secure delivery of parcels</p>
          <div class="mr-2 bg-white rounded pr-3">
            <form (ngSubmit)="login()">
              <label class="font-bold" for="email">Email Address</label><br>
              <input id="email" type="email" placeholder="Enter your Email" [(ngModel)]="form.email" name="email" class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl"><br>

              <label class="font-bold" for="password">Password</label><br>
              <input id="password" type="password" placeholder="Enter your Password" [(ngModel)]="form.password" name="password" class="w-[400px] my-1 p-2 mb-4 border border-black-600 rounded-2xl"><br>

              <div class="flex justify-end mb-10">
                <a href="#" class="text-sm text-blue-600 hover:underline" routerLink="/forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" class="bg-[rgba(37,38,65,1.0)] text-white px-10 py-1 rounded-2xl flex justify-center ml-[250px]">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Login {
  form = {
    email: '',
    password: ''
  };

  constructor(
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    console.log('Login form submitted:', this.form);

    this.authService.login(this.form).subscribe({
      next: (res) => {
        this.alertService.showAlert('Successfully logged in!', 'success');

        const token = res.access_token;
        localStorage.setItem('token', token);

        const decoded: any = jwtDecode(token); 

        const role = decoded.role; 
        const userData = {
          email: this.form.email,
          accessToken: token,
          role: role,
          loggedInAt: new Date().toISOString()
        };

        localStorage.setItem('user', JSON.stringify(userData));

        console.log('Logged in user role:', role);

       
        if (role === 'ADMIN') {
          this.router.navigate(['/ahome']);
        } else if (role === 'COURIER') {
          this.router.navigate(['/cordb']);
        } else {
          this.router.navigate(['/uhome']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.alertService.showAlert('Login failed. Please check your credentials.', 'error');
      }
    });
  }
}