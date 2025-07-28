import { Component } from '@angular/core';
import { More } from '../../../home/more/more'; 
import { Hero } from '../../../home/hero/hero'; 
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-uhome',
  imports: [More, Hero,RouterLink],
  template: `
      
      <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/uhome">Home</button>
        <button class="p-5" routerLink="/uservices" >Services</button>
        <button class="p-5" routerLink="/mydb"> My DashBoard</button>
        <button class="p-5" routerLink="/ucontact">Contact Us</button>
        <button class="p-5" routerLink="/uabout">About Us</button>
      </div>
      <button class="p-5" click="logout()">Log Out</button>
    </div>
      <app-hero></app-hero>
      <app-more></app-more>
  `,
  styles: ``
})
export class Uhome {
  constructor(private router: Router) {}
  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      this.router.navigate(['/home']);
      console.log('logged out');
      
    
  }

}
