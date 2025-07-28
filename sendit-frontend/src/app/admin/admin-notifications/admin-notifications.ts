import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-notifications',
  imports: [RouterLink],
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
    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
        <div class="flex justify-center my-7">
        <button routerLink="/profile">
             <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
          </button>
        </div>
        <div class="px-5 pt-5  ">
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/adash">Dash overview </button> 
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/acreate"> Create Parcel</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/amanage">Manage Parcel</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/arequests">Sent Requests</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/ausers">Users</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/anotification">notifications</button>
        </div>
      </div>
      <div class=" border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5">
        <span class="flex justify-center text-center">
           <h1 class="font-bold text-xl"> Notifications </h1>
        </span>
      </div>
    </div>
  `,
  styles: ``
})
export class AdminNotifications {
  constructor(private router: Router) {}
  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      this.router.navigate(['/home']);
      console.log('logged out');
      
    
  }

}
