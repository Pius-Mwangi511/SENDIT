import { Component } from '@angular/core';
import { Hero } from "../../home/hero/hero";
import { More } from "../../home/more/more";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Hero, More,RouterLink],
  template: `
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/ahome">Home</button>
        <button class="p-5" routerLink="/aservices" >Services</button>
        <button class="p-5" routerLink="/adash"> Admin DashBoard</button>
        <button class="p-5" routerLink="/acontact">Contact Us</button>
        <button class="p-5" routerLink="/aabout">About Us</button>
      </div>
      <button class="p-5" (click)="logout()">Log Out</button>
    </div>
    <app-hero></app-hero>
    <app-more></app-more>
  `,
  styles: ``
})
export class AHome {
  constructor(private router: Router) {}
  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      this.router.navigate(['/home']);
      console.log('logged out');
      
    
  }

}
