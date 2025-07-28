import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

import { HighlightHeavyDirective } from '../../../shared/all-directives/directives/highlight-heavy';
import { StatusFormatPipe } from '../../../shared/all-pipes/pipes/status-format-pipe';
import { ParcelService } from '../../../services/parcels'; 
import { ParcelTrackingService } from '../../../services/parcel-tracking'; 

@Component({
  selector: 'app-update-location',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    HighlightHeavyDirective,
    StatusFormatPipe
  ],
  template: `
    <!-- Navbar -->
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/chome">Home</button>
        <button class="p-5" routerLink="/cservices">Services</button>
        <button class="p-5" routerLink="/cordb">Courier DashBoard</button>
        <button class="p-5" routerLink="/ccontact">Contact Us</button>
        <button class="p-5" routerLink="/cabout">About Us</button>
      </div>
      <button class="p-5" routerLink="/home">Log Out</button>
    </div>
    <hr>

    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <!-- Sidebar -->
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
        <div class="flex justify-center my-7">
          <button routerLink="/profile">
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full" />
          </button>
        </div>
        <div class="px-5 pt-5">
          <button class="text-white font-bold flex my-6" routerLink="/cordb">Dashboard overview</button>
          <button class="text-white font-bold flex my-6" routerLink="/cnotification">Notification</button>
          <button class="text-white font-bold flex my-6" routerLink="/all-supplies">All Supplies</button>
          <button class="text-white font-bold flex my-6" routerLink="/update-location">Update Location</button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="w-[1150px] bg-[rgba(37,38,65,0.08)] ml-8 shadow-2xl rounded-xl ml-[140px] m-5 p-5 w-full mt-10 mt-10 overflow-x-auto">
        <h1 class="text-xl font-bold ml-5 pt-4">Update Location</h1>
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
            <ng-container *ngFor="let parcel of parcels">
              <tr class="border-t hover:bg-gray-50">
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
                    {{ parcel.status | statusFormat }}
                  </span>
                </td>
                <td class="p-2">{{ parcel.sender?.email || 'N/A' }}</td>
                <td class="p-2">{{ parcel.receiver?.email || 'N/A' }}</td>
                <td class="p-2">{{ parcel.courier?.email || 'Unassigned' }}</td>
                <td class="p-2 space-x-2">
                  <button class="text-blue-600 hover:underline" [routerLink]="['/viewParcel', parcel.id]">View</button>
                  <button class="text-green-600 hover:underline" (click)="editParcelId = parcel.id">Update Location</button>
                </td>
              </tr>

              <!-- Editable Row -->
              <tr *ngIf="editParcelId === parcel.id" class="bg-gray-50 border-t">
                <td colspan="8" class="p-4">
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- <input type="number" [(ngModel)]="tracking.latitude" placeholder="Latitude" class="border p-2 rounded" />
                    <input type="number" [(ngModel)]="tracking.longitude" placeholder="Longitude" class="border p-2 rounded" /> -->
                    <input type="text" [(ngModel)]="tracking.location" placeholder="Location" class="border p-2 rounded" />
                    <input type="text" [(ngModel)]="tracking.statusNote" placeholder="Status Note" class="border p-2 rounded" />
                  </div>
                  <div class="mt-4 text-right">
                    <button (click)="saveTracking(parcel.id)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Save Update
                    </button>
                  </div>
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``
})
export class UpdateLocation implements OnInit {
  parcels: any[] = [];
  editParcelId: string | null = null;

  tracking = {
    latitude: 0,
    longitude: 0,
    location: '',
    statusNote: ''
  };

  constructor(
    private parcelService: ParcelService,
    private trackingService: ParcelTrackingService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded: any = jwtDecode(token);
      const courierEmail = decoded.email;

      this.parcelService.getParcels().subscribe({
        next: (res) => {
          this.parcels = res.filter(
            (p: any) => p.courier?.email?.toLowerCase() === courierEmail.toLowerCase()
          );
        },
        error: (err) => {
          console.error('Failed to fetch parcels:', err);
        }
      });
    } else {
      console.warn('No token found in localStorage');
    }
  }

  saveTracking(parcelId: string) {
    const data = {
      parcelId,
      // latitude: this.tracking.latitude,
      // longitude: this.tracking.longitude,
      location: this.tracking.location,
      statusNote: this.tracking.statusNote,
      timestamp: new Date().toISOString()
    };

    this.trackingService.create(data).subscribe({
      next: () => {
        alert('Tracking location updated successfully!');
        this.editParcelId = null;
        this.tracking = {
          latitude: 0,
          longitude: 0,
          location: '',
          statusNote: ''
        };
      },
      error: (err) => {
        console.error('Error saving tracking:', err);
        alert('Failed to update tracking location.');
      }
    });
  }
}
