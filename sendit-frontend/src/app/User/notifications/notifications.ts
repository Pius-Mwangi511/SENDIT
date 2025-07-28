import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [RouterLink],
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
      <button class="p-5" routerLink="/home">Log Out</button>
    </div>
    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
        <div class="flex justify-center my-7">
        <button routerLink="/profile">
             <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
          </button>
        </div>
        <div class="px-5 pt-5  ">
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/mydb">My Dashboard </button> 
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/sent">Sent</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/received">Received</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/notification">Notification</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/create">+Create Parcel</button>
        </div>
      </div>
      <div class=" border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5">
        <span class="flex justify-center text-center">
           <h1 class="font-bold text-xl">Notifications</h1>
        </span>
      </div>
    </div>
  `,
  styles: ``
})
export class Notifications {

}
