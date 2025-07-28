import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Parcel, ParcelService } from '../../../services/parcels';
import { HighlightHeavyDirective } from '../../../shared/all-directives/directives/highlight-heavy';

@Component({
  selector: 'app-all-supplies',
  imports: [RouterLink,CommonModule,HighlightHeavyDirective],
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
    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
        <div class="flex justify-center my-7">
        <button routerLink="/profile">
             <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
          </button>
        </div>
        <div class="px-5 pt-5  ">
        <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/cordb"> Dashboard overview </button> 
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/cnotification">Notification</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/all-supplies">All Supplies</button>
          <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/update-location">Update Location</button>
        </div>
      </div>
      <div class="w-[1150px] bg-[rgba(37,38,65,0.08)]  shadow-2xl rounded-xl ml-[140px] m-5 p-5 w-full mt-10 overflow-x-auto">
  <h1 class="text-xl font-bold ml-5 pt-4">Delivery History</h1>
  <table class="min-w-full table-auto border rounded-lg text-sm mt-4 mb-4">
    <thead class="bg-gray-100 text-left">
      <tr>
        <th class="p-2">ID</th>
        <th class="p-2">Weight</th>
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
        <td class="p-2" [appHighlightHeavy]="parcel.weight">{{ parcel.weight }} kg</td>
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
export class AllSupplies {
  myParcels: Parcel[] = [];
  constructor(private parcelService: ParcelService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const courierEmail = user?.email;


    if (courierEmail) {
      this.parcelService.getParcels().subscribe({
      next: (parcels) => {
      
      this.myParcels = parcels.filter(p =>p.courier?.email?.toLowerCase() === courierEmail?.toLowerCase());
      
    },
    error: (err) => {
      console.error('Failed to load parcels for courier:', err);
    }
  });
}
  }
}
