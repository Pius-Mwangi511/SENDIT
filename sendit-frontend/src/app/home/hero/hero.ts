import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
   <div class="bg-gradient-to-b from-[rgba(41,185,231,0.0)] via-[rgba(41,185,231,0.2)] to-[rgba(153,153,153,0.9)] h-[400px] flex justify-center mt-10">
    <div class=" grid grid-cols-[600px,600px] gap-4 items-center   ">
      <div class=" ml-[100px]">
        <h1 class="text-5xl">Deliver Parcel Fast & <br> Securely with <br> SendIT</h1>
        <p class="mt-4 text-xl">Whether youy’re sending a document or a package, sendIT <br>helps you delover it with ease, speed, and <br>peace of mind</p>
        <button class="border rounded-xl bg-[rgba(37,38,65,1.0)] text-white mt-[50px] px-4 py-2" routerLink="/register">Join Now</button>
      </div>
      <div class="">
        <img src="assets/images/all.png" alt="herro image" height="400px" class="h-[400px] w-[600px]"> 
      </div>
    </div>

   <!-- </div> -->
  `,
  styles: ``
})
export class Hero {

}
