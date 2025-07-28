import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ CommonModule,RouterLink],
  template: `
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-3xl font-bold text-blue-600">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/home">Home</button>
        <button class="p-5" routerLink="/about">About Us</button> 
        <button class="p-5" routerLink="/services" >Services</button>
        <button class="p-5" routerLink="/login">DashBoard</button>
        <button class="p-5" routerLink="/contact">Contact Us</button>
        
      </div>
      <button class="p-5" routerLink="/register">Sign Up</button>
    </div>
    <hr>
  `,
  styles: ``
})
export class Header {

}
