import { Component } from '@angular/core';
import { Hero } from '../../home/hero/hero';
import { RouterLink } from '@angular/router';
import { More } from '../../home/more/more';

@Component({
  selector: 'app-chome',
  imports: [Hero, More,RouterLink],
  template: `
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/chome">Home</button>
        <button class="p-5" routerLink="/cservices" >Services</button>
        <button class="p-5" routerLink="/cordb"> Courier DashBoard</button>
        <button class="p-5" routerLink="/ccontact">Contact Us</button>
        <button class="p-5" routerLink="/cabout">About Us</button>
      </div>
      <button class="p-5" routerLink="/home">Log Out</button>
    </div>
    <hr>
    <app-hero></app-hero>
    <app-more></app-more>
  `,
  styles: ``
})
export class Chome {

}
