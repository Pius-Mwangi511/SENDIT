import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ParcelService, Parcel } from '../../services/parcels'; 
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Header -->
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/ahome">Home</button>
        <button class="p-5" routerLink="/aservices">Services</button>
        <button class="p-5" routerLink="/adash">Admin DashBoard</button>
        <button class="p-5" routerLink="/acontact">Contact Us</button>
        <button class="p-5" routerLink="/aabout">About Us</button>
      </div>
      <button class="p-5" (click)="logout()">Logout</button>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      
      <!-- Sidebar -->
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[700px] w-[300px] mx-5">
        <div class="flex justify-center my-7">
          <button routerLink="/profile">
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
          </button>
        </div>
        <div class="px-5 pt-5">
          <button class="text-white font-bold flex my-6" routerLink="/adash">Dash overview</button>
          <button class="text-white font-bold flex my-6" routerLink="/acreate">Create Parcel</button>
          <button class="text-white font-bold flex my-6" routerLink="/amanage">Manage Parcel</button>
          <button class="text-white font-bold flex my-6" routerLink="/arequests">Sent Requests</button>
          <button class="text-white font-bold flex my-6" routerLink="/ausers">Users</button>
          <button class="text-white font-bold flex my-6" routerLink="/anotification">Notifications</button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="ml-[140px]">
        <!-- Welcome Box -->
        <div class="h-[300px] w-[1150px] bg-[rgba(37,38,65,0.9)] ml-8 shadow-2xl pl-5 rounded-xl">
          <h2 class="text-white pt-10 ml-4">{{ currentDate }}</h2>
          <h1 class="font-bold text-2xl text-white mt-8 ml-4">Welcome Back, Admin!</h1>
          <p class="text-white mt-3 ml-4">Manage all system activities and see analytics of the system.</p>
        </div>

        <!-- Summary -->
        <div class="my-7 h-[300px] w-[1150px] bg-[rgba(37,38,65,0.0)] ml-8 shadow-xl pl-5 rounded-xl">
          <h1 class="text-xl font-bold ml-5">Summary</h1>
          <div class="flex justify-evenly mt-10">
            <span class="border border-black-600 rounded-xl shadow-2xl w-[250px] m-5 text-2xl font-bold p-3">
              Pending Approvals:<br>
              <span class="text-black-600">{{ pendingCount }}</span>
            </span>
            <span class="border border-black-600 rounded-xl shadow-2xl w-[250px] m-5 text-2xl font-bold p-3">
              📦 Total Parcels:<br>
              <span class="text-black-600">{{ totalCount }}</span>
            </span>
            <span class="border border-black-600 rounded-xl shadow-2xl w-[250px] m-5 text-2xl font-bold p-3">
              Delivered:<br>
              <span class="text-black-600">{{ deliveredCount }}</span>
            </span>
            <span class="border border-black-600 rounded-xl shadow-2xl w-[250px] m-5 text-2xl font-bold p-3">
              🚚 In Transit:<br>
              <span class="text-black-600">{{ inTransitCount }}</span>
            </span>
          </div>
        </div>

        <!-- Recent Activity (can expand later) -->
        <div class="h-[300px] w-[1150px] bg-[rgba(37,38,65,0.08)] ml-8 shadow-2xl pl-5 rounded-xl mt-10"> 
          <h1 class="text-xl font-bold ml-5">Recent Activities</h1>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class Dashboard implements OnInit {
  currentDate = new Date().toISOString().slice(0, 10);
  totalCount = 0;
  deliveredCount = 0;
  inTransitCount = 0;
  pendingCount = 0;

  constructor(private router: Router, private parcelService: ParcelService) {}

  ngOnInit() {
    this.parcelService.getParcels().subscribe({
      next: (parcels) => {
        this.totalCount = parcels.length;
        this.deliveredCount = parcels.filter(p => p.status === 'DELIVERED').length;
        this.inTransitCount = parcels.filter(p => p.status === 'IN_TRANSIT').length;
        this.pendingCount = parcels.filter(p => p.status === 'PENDING').length;
      },
      error: (err) => {
        console.error('Failed to load parcels', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    console.log('Logged out');
  }
}
