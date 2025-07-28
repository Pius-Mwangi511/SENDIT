import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { HighlightHeavyDirective } from '../../shared/all-directives/directives/highlight-heavy';
import { StatusFormatPipe } from "../../shared/all-pipes/pipes/status-format-pipe";
import { FormsModule } from '@angular/forms';
import { ParcelService, Parcel } from '../../services/parcels'; 
import { AlertService } from '../../shared/alert-service';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { UserService } from '../../services/users'; 
type ParcelWithUI = Parcel & {
  editing?: boolean;
  courierEmail?: string;
  currentCourierEmail?: string;
};

@Component({
  selector: 'app-admin-manage-parcels',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgClass,
    CommonModule,
    HighlightHeavyDirective,
    StatusFormatPipe,
    FormsModule,
    AlertComponent,
    
  ],
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
      <button class="p-5" (click)="logout()">Log Out</button>
    </div>

    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <!-- Sidebar -->
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
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
      <div class="border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5 p-5 w-full">
        <h1 class="text-center font-bold text-2xl mb-6">Manage All Parcels</h1>

        <div *ngIf="parcels.length === 0" class="text-center text-gray-600">No parcels available.</div>

        <!-- Parcel Table -->
        <div class="overflow-x-auto" *ngIf="parcels.length > 0">
          <table class="min-w-full table-auto border rounded-lg text-sm">
            <thead class="bg-gray-100 text-left">
              <tr>
                <th class="p-2">ID</th>
                <th class="p-2">Weight</th>
                <th class="p-2">Category</th>
                <th class="p-2">Status</th>
                <th class="p-2">Sender</th>
                <th class="p-2">Receiver</th>
                <th class="p-2">Courier Email</th>
                <th class="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let parcel of parcels" class="border-t hover:bg-gray-50">
                <td class="p-2">{{ parcel.id }}</td>
                <td class="p-2" [appHighlightHeavy]="parcel.weight">{{ parcel.weight }} kg</td>
                <td class="p-2">{{ parcel.category }}</td>

                <!-- Status -->
                <td class="p-2">
                  <ng-container *ngIf="!parcel.editing; else editStatus">
                    <span [ngClass]="{
                      'text-yellow-600': parcel.status === 'PENDING',
                      'text-blue-600': parcel.status === 'IN_TRANSIT',
                      'text-green-600': parcel.status === 'DELIVERED',
                      'text-red-600': parcel.status === 'CANCELLED'
                    }">
                      {{ (parcel.status ?? 'PENDING') | statusFormat }}
                    </span>
                  </ng-container>
                  <ng-template #editStatus>
                    <select
                      class="border px-2 py-1 rounded text-sm"
                      [(ngModel)]="parcel.status"
                      (change)="updateStatus(parcel)"
                    >
                      <option *ngFor="let status of statusOptions" [value]="status">
                        {{ status | statusFormat }}
                      </option>
                    </select>
                  </ng-template>
                </td>

                <!-- Sender & Receiver -->
                <td class="p-2">{{ parcel.sender?.fullName || parcel.sender?.email }}</td>
                <td class="p-2">{{ parcel.receiver?.fullName || parcel.receiver?.email }}</td>

                <!-- Courier Email Assign -->
                <td class="p-2">
                  <select
                    class="border px-2 py-1 rounded w-[180px]"
                    [(ngModel)]="parcel.courierEmail"
                  >
                    <option [value]="undefined" disabled selected>
                      {{ parcel.currentCourierEmail || 'Select courier' }}
                    </option>
                    <option *ngFor="let courier of couriers" [value]="courier.email">
                      {{ courier.email }}
                    </option>
                  </select>
                  <app-alert></app-alert>
                  <button
                    class="text-blue-600 text-xs mt-1 block"
                    (click)="assignCourier(parcel)"
                  >
                    Assign
                  </button>
                </td>

                <!-- Actions -->
                <td class="p-2 space-x-2">
                  <button class="text-blue-600 hover:underline" [routerLink]="['/viewParcel', parcel.id]">View</button>
                  <button class="text-green-600 hover:underline" (click)="toggleEditing(parcel)">
                    {{ parcel.editing ? 'Close' : 'Change Status' }}
                  </button>
                  <button class="text-red-600 hover:underline" (click)="deleteParcel(parcel.id!)">Delete</button>
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
export class AdminManageParcels implements OnInit {
  parcels: ParcelWithUI[] = []; 
  couriers: { email: string }[] = []; // < store all available couriers
  statusOptions = ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'];

  constructor(private parcelService: ParcelService, private alertService: AlertService,private userService: UserService,private router: Router) {}

  ngOnInit() {
    this.loadParcels();
    this.loadCouriers(); //  load couriers list on init
  }

  loadParcels() {
    this.parcelService.getParcels().subscribe({
      next: (data) => {
        this.parcels = data.map(p => ({
          ...p,
          editing: false,
          courierEmail: '',
          currentCourierEmail: p.courier?.email ?? '' 
        }));
        
      },
      error: (err) => {
        console.error('Failed to fetch parcels', err);
      }
    });
  }

  loadCouriers() {
    this.userService.findCouriers().subscribe({
      next: (data) => {
        this.couriers = data;
      },
      error: (err) => {
        console.error('Failed to fetch couriers', err);
      }
    });
  }

  toggleEditing(parcel: any) {
    parcel.editing = !parcel.editing;
  }

  updateStatus(parcel: any) {
    const { id, status } = parcel;
    this.parcelService.updateParcel(id, { status }).subscribe({
      next: () => {
        parcel.editing = false;
      },
      error: (err) => {
        console.error('Failed to update status', err);
      }
    });
  }

  deleteParcel(id: string) {
    if (confirm('Are you sure you want to delete this parcel?')) {
      this.parcelService.deleteParcel(id).subscribe({
        next: () => {
          this.parcels = this.parcels.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Failed to delete parcel', err);
        }
      });
    }
  }

  assignCourier(parcel: any) {
    if (!parcel.courierEmail) {
      this.alertService.showAlert('Please select a courier', 'error');
      return;
    }

    this.parcelService.assignCourier(parcel.id, parcel.courierEmail).subscribe({
      next: () => {
        this.alertService.showAlert(`Courier ${parcel.courierEmail} assigned successfully!`, 'success');
        parcel.currentCourierEmail = parcel.courierEmail; // update display
        parcel.courierEmail = ''; // reset selection
      },
      error: (err) => {
        console.error('Failed to assign courier:', err);
        this.alertService.showAlert('Failed to assign courier', 'error');
      }
    });
  }
  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      this.router.navigate(['/home']);
      console.log('logged out');
      
    
  }
}