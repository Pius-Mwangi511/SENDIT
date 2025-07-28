import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../shared/alert-service';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { ParcelService } from '../../services/parcels';

@Component({
  selector: 'app-create-parcel',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AlertComponent],
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
        <div class="px-5 pt-5">
          <button class="text-white font-bold flex my-6" routerLink="/mydb">My Dashboard</button> 
          <button class="text-white font-bold flex my-6" routerLink="/sent">Sent</button>
          <button class="text-white font-bold flex my-6" routerLink="/received">Received</button>
          <button class="text-white font-bold flex my-6" routerLink="/notification">Notification</button>
          <button class="text-white font-bold flex my-6" routerLink="/create">+Create Parcel</button>
        </div>
      </div>

      <div class="border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5 w-full">
        <span class="flex justify-center text-center">
          <h1 class="font-bold text-xl">Create Parcel Request</h1>
        </span>
        <div>
          <form [formGroup]="parcelForm" (ngSubmit)="onSubmit()" class="space-y-4 p-4 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
            
            <!-- Weight -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input type="number" step="0.01" formControlName="weight" class="mt-1 block w-full border rounded-md p-2" />
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <select formControlName="category" class="mt-1 block w-full border rounded-md p-2">
                <option value="">Select Category</option>
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
                <option value="OVERSIZE">Oversize</option>
              </select>
            </div>

            <!-- Pickup Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Pickup Address</label>
              <input type="text" formControlName="pickupAddress" class="mt-1 block w-full border rounded-md p-2" />
            </div>

            <!-- Destination Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Destination Address</label>
              <input type="text" formControlName="destinationAddress" class="mt-1 block w-full border rounded-md p-2" />
            </div>


            <!-- Sender -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Sender Email</label>
              <input type="text" formControlName="senderEmail" class="mt-1 block w-full border rounded-md p-2" />
            </div>

            <!-- Receiver -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Receiver Email</label>
              <input type="text" formControlName="receiverEmail" class="mt-1 block w-full border rounded-md p-2" />
            </div>

            <!-- Submit -->
             <app-alert></app-alert>  
            <div>
              <button type="submit" (click)="onSubmit()"  class="w-full bg-[rgba(37,38,65,0.7)] text-white py-2 px-4 rounded-md hover:bg-[rgba(37,38,65,0.9)]">
                Submit Parcel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class CreateParcel {
  parcelForm: FormGroup;

  constructor(private fb: FormBuilder , private alertService: AlertService,private parcelService: ParcelService,private router: Router) {
    this.parcelForm = this.fb.group({
      weight: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      pickupAddress: ['', Validators.required],
      destinationAddress: ['', Validators.required],
      senderEmail: ['', [Validators.required, Validators.email]],
      receiverEmail: ['', [Validators.required, Validators.email]],
      // courierEmail: ['', [Validators.required, Validators.email]],
      status: ['PENDING'] 
    });
  }

  onSubmit() {
    if (this.parcelForm.valid) {
      const parcelData = this.parcelForm.value;
  
      this.parcelService.createParcel(parcelData).subscribe({
        next: (response) => {
          console.log('Parcel created:', response);
          this.alertService.showAlert('Parcel successfully created!', 'success');
          this.parcelForm.reset({ status: 'PENDING' }); // Reset with default
        },
        error: (error) => {
          console.error('Error creating parcel:', error);
          this.alertService.showAlert('Failed to create parcel. Please try again.', 'error');
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
