import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  template: `
  <div class="flex justify-center items-center">
    <div class="flex justify-center  h-[400px] mt-[100px] w-[300px] bg-[rgba(37,38,65,0.05)] border border-red-600 rounded text-black">
      <div class=" pl-5 ">
         <button class="bg-[rgba(37,38,65,1.0)] text-white px-2 py-2 mt-4 rounded-full" (click)="goBack()">❌</button>
         <h1 class="text-red-600 text-center text-3xl font-bold">Unauthorized</h1>
         <h1 class="font-bold text-center text-2xl">You are not authorized to access this page</h1>
         <div class="flex justify-center mt-10">
          <button class="bg-[rgba(37,38,65,1.0)] text-white px-4 py-2 mt-8 rounded" (click)="goBack()">Exit</button>
         </div>
      </div>
     
     </div>
    </div>
  
  `,
  styles: ``
})
export class Unauthorized {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}

