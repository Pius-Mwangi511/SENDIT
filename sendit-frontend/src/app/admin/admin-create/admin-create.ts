import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ParcelService, Parcel } from '../../services/parcels'; 
import { AlertService } from '../../shared/alert-service';
import { AlertComponent } from '../../shared/alert-component/alert-component';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AlertComponent],
  template: `
    <!-- Navbar -->
    <div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex items-center">
        <button class="p-5" routerLink="/ahome">Home</button>
        <button class="p-5" routerLink="/aservices">Services</button>
        <button class="p-5" routerLink="/adash">Admin Dashboard</button>
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
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full" />
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

      <!-- Form Section -->
      <div class="border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5">
        <span class="flex justify-center text-center">
          <h1 class="font-bold text-xl">Create New Parcel</h1>
        </span>

        <form [formGroup]="parcelForm" (ngSubmit)="onSubmit()" class="space-y-4 p-4 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
          <!-- Weight -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" step="0.01" formControlName="weight" class="mt-1 block w-full border rounded-md p-2" required />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select formControlName="category" class="mt-1 block w-full border rounded-md p-2" required>
              <option value="">Select Category</option>
              <option value="SMALL">Small</option>
              <option value="MEDIUM">Medium</option>
              <option value="LARGE">Large</option>
              <option value="OVERSIZE">Oversize</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select formControlName="status" class="mt-1 block w-full border rounded-md p-2" required>
              <option value="PENDING">Pending</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <!-- Pickup Address -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Pickup Address</label>
            <input type="text" formControlName="pickupAddress" class="mt-1 block w-full border rounded-md p-2" required />
          </div>

          <!-- Destination Address -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Destination Address</label>
            <input type="text" formControlName="destinationAddress" class="mt-1 block w-full border rounded-md p-2" required />
          </div>

          <!-- Pickup Coordinates -->
          <!-- <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Pickup Latitude</label>
              <input type="number" step="any" formControlName="pickupLat" class="mt-1 block w-full border rounded-md p-2" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Pickup Longitude</label>
              <input type="number" step="any" formControlName="pickupLng" class="mt-1 block w-full border rounded-md p-2" required />
            </div>
          </div> -->

          <!-- Destination Coordinates -->
          <!-- <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Destination Latitude</label>
              <input type="number" step="any" formControlName="destinationLat" class="mt-1 block w-full border rounded-md p-2" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Destination Longitude</label>
              <input type="number" step="any" formControlName="destinationLng" class="mt-1 block w-full border rounded-md p-2" required />
            </div>
          </div> -->

          <!-- Sender Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Sender Email</label>
            <input type="email" formControlName="senderEmail" class="mt-1 block w-full border rounded-md p-2" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Courier Email</label>
            <input type="email" formControlName="courierEmail" class="mt-1 block w-full border rounded-md p-2" required />
          </div>

          <!-- Receiver Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Receiver Email</label>
            <input type="email" formControlName="receiverEmail" class="mt-1 block w-full border rounded-md p-2" required />
          </div>
          <app-alert></app-alert>
          <!-- Submit -->
          <div>
            <button type="submit" class="w-full bg-[rgba(37,38,65,0.7)] text-white py-2 px-4 rounded-md hover:bg-[rgba(37,38,65,0.9)]">
              Submit Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AdminCreate {
  parcelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parcelService: ParcelService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.parcelForm = this.fb.group({
      weight: [null, Validators.required],
      category: ['', Validators.required],
      status: ['PENDING', Validators.required],
      pickupAddress: ['', Validators.required],
      destinationAddress: ['', Validators.required],
      // pickupLat: [null, Validators.required],
      // pickupLng: [null, Validators.required],
      // destinationLat: [null, Validators.required],
      // destinationLng: [null, Validators.required],
      courierEmail: ['', [Validators.required, Validators.email]],
      senderEmail: ['', [Validators.required, Validators.email]],
      receiverEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.parcelForm.valid) {
      const newParcel: Parcel = this.parcelForm.value;
      this.parcelService.createParcel(newParcel).subscribe({
        next: (created) => {
          this.alertService.showAlert('Parcel successfully created!', 'success');
          this.parcelForm.reset();
        },
        error: (err) => {
          console.error('Error:', err);
          this.alertService.showAlert('Failed to create parcel.', 'error');
        }
      });
    } else {
      this.alertService.showAlert('Please fill in all fields', 'error');
    }
  }
  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      this.router.navigate(['/home']);
      console.log('logged out');
      
    
  }
}
