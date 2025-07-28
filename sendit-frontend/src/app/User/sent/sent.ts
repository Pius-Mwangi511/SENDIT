import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParcelService, Parcel } from '../../services/parcels'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-received',
  imports: [RouterLink,CommonModule],
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
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6" routerLink="/mydb">My Dashboard </button> 
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/sent">Sent</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/received">Received</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/notification">Notification</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/create">+Create Parcel</button>
        </div>
      </div>
      <div class="w-[1150px] bg-[rgba(37,38,65,0.08)] ml-8  mt-10 overflow-x-auto  border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5">
  <h1 class="text-xl font-bold ml-5 pt-4">Sent Parcels</h1>
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
  `,
  styles: ``
})
export class Sent {
  myParcels: Parcel[] = [];
  userEmail: string = '';

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
     parcel.senderEmail === this.userEmail
  );
});
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/home']);
  console.log('logged out');
}

}
