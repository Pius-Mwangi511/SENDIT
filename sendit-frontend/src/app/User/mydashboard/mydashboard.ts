import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ParcelService, Parcel } from '../../services/parcels'; 
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-mydashboard',
  standalone: true,
  imports: [RouterLink,DatePipe,CommonModule],
  template: `
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/uhome">Home</button>
        <button class="p-5" routerLink="/uservices">Services</button>
        <button class="p-5" routerLink="/mydb">My DashBoard</button>
        <button class="p-5" routerLink="/ucontact">Contact Us</button>
        <button class="p-5" routerLink="/uabout">About Us</button>
      </div>
      <button class="p-5" (click)="logout()">Log Out</button>
    </div>

    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[700px] w-[300px] mx-5">
        <div class="flex justify-center my-7">
          <button routerLink="/profile">
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full" />
          </button>
        </div>
        <div class="px-5 pt-5">
          <button class="text-white font-bold flex my-6" routerLink="/mydb">My Dashboard</button>
          <button class="text-white font-bold flex my-6" routerLink="/sent">Sent</button>
          <button class="text-white font-bold flex my-6" routerLink="/received">Received</button>
          <button class="text-white font-bold flex my-6" routerLink="/notification">Notification</button>
          <button class="text-white font-bold flex my-6" routerLink="/create">+Create Parcel</button>
        </div>
      </div>

      <div class="ml-[140px]">
        <div class="h-[300px] w-[1150px] bg-[rgba(37,38,65,0.9)] ml-8 shadow-2xl pl-5 rounded-xl">
          <h2 class="text-white pt-10 ml-4">{{ currentDate | date:'fullDate' }}</h2>
          <h1 class="font-bold text-3xl text-white mt-8 ml-4">Welcome Back, {{ userEmail }}</h1>
          <p class="text-white mt-3 ml-4 text-xl">Always stay updated on your parcel activities.</p>
        </div>

        <div class="m-7 h-[220px] w-[1150px] bg-[rgba(37,38,65,0.05)] ml-8 shadow-xl pl-5 rounded-xl">
          <h1 class="text-xl font-bold ml-5">Summary</h1>
          <div class="flex justify-evenly mt-10">
            <span class="border rounded-xl shadow-2xl w-[200px] m-5 text-2xl font-bold p-3">
              Received: <br />
              <span class="text-black-600">{{ receivedCount }}</span>
            </span>
            <span class="border rounded-xl shadow-2xl w-[200px] m-5 text-2xl font-bold p-3">
              Sent: <br />
              <span class="text-black-600">{{ sentCount }}</span>
            </span>
            <span class="border rounded-xl shadow-2xl w-[200px] m-5 text-2xl font-bold p-3">
              Delivered: <br />
              <span class="text-black-600">{{ deliveredCount }}</span>
            </span>
          </div>
        </div>

        <div class="w-[1150px] bg-[rgba(37,38,65,0.08)] ml-8 shadow-2xl rounded-xl mt-10 overflow-x-auto">
  <h1 class="text-xl font-bold ml-5 pt-4">My Parcels</h1>
  <table class="min-w-full table-auto border rounded-lg text-sm mt-4 mb-4">
    <thead class="bg-gray-100 text-left">
      <tr>
        <th class="p-2">ID</th>
        <th class="p-2">Pickup</th>
        <th class="p-2">Destination</th>
        <th class="p-2">Status</th>
        <th class="p-2">Sender</th>
        <th class="p-2">Receiver</th>
        <th class="p-2">Courier</th>
        <th class="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let parcel of myParcels" class="border-t hover:bg-gray-50">
        <td class="p-2">{{ parcel.id }}</td>
        <td class="p-2">{{ parcel.pickupAddress }}</td>
        <td class="p-2">{{ parcel.destinationAddress }}</td>
        <td class="p-2">
          <span [ngClass]="{
            'text-yellow-600': parcel.status === 'PENDING',
            'text-blue-600': parcel.status === 'IN_TRANSIT',
            'text-green-600': parcel.status === 'DELIVERED',
            'text-red-600': parcel.status === 'CANCELLED'
          }">
            {{ parcel.status }}
          </span>
        </td>
        <td class="p-2">{{ parcel.sender?.email || 'N/A' }}</td>
        <td class="p-2">{{ parcel.receiver?.email || 'N/A' }}</td>
        <td class="p-2">{{ parcel.courier?.email || 'Unassigned' }}</td>
        <td class="p-2 space-x-2">
          <button class="text-blue-600 hover:underline" [routerLink]="['/viewParcel', parcel.id]">Track</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
    </div>
  `,
  styles: ``
})
export class Mydashboard implements OnInit {
  currentDate = new Date();
  userEmail: string = '';
  myParcels: Parcel[] = [];
  sentCount = 0;
  receivedCount = 0;
  deliveredCount = 0;

  constructor(private router: Router, private parcelService: ParcelService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.userEmail = userData ? JSON.parse(userData).email : '';

    this.parcelService.getParcels().subscribe((parcels) => {
      this.myParcels = parcels
  .map(parcel => ({
    ...parcel,
    senderEmail: parcel.sender?.email,
    receiverEmail: parcel.receiver?.email,
  }))
  .filter(parcel =>
    parcel.senderEmail === this.userEmail || parcel.receiverEmail === this.userEmail
  );


      this.sentCount = this.myParcels.filter(p => p.senderEmail === this.userEmail).length;
      this.receivedCount = this.myParcels.filter(p => p.receiverEmail === this.userEmail).length;
      this.deliveredCount = this.myParcels.filter(p => p.status === 'DELIVERED').length;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    console.log('logged out');
  }
}
