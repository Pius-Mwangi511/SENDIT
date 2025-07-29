import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/users';  // Adjust the path accordingly
import { UpdateUserDto } from '../../../interfaces/user.dtos';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
  <div class="flex justify-start items-center pl-5 ">
    <button class="bg-[rgba(37,38,65,1.0)] text-white px-4 py-2 mt-4 rounded" (click)="goBack()">Exit</button>
  </div>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">
    <h2 class="text-2xl font-bold text-center mb-6">Profile Settings</h2>

    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-5">

      <!-- Profile Picture -->
      <div class="text-center">
        <img 
          [src]="previewUrl || 'assets/images/all.png'"
          alt="Profile Picture"
          class="mx-auto w-24 h-24 rounded-full object-cover border"
        />
        <input type="file" accept="image/*" (change)="onFileSelected($event)" class="mt-3" />
      </div>

      <!-- Username -->
      <div>
        <label class="block font-semibold mb-1">Username</label>
        <input formControlName="name" type="text" class="w-full p-2 border rounded-md" />
      </div>

      <!-- Email -->
      <div>
        <label class="block font-semibold mb-1">Email</label>
        <input formControlName="email" type="email" class="w-full p-2 border rounded-md" />
      </div>

      <!-- Phone -->
      <div>
        <label class="block font-semibold mb-1">Phone Number</label>
        <input formControlName="phone" type="tel" class="w-full p-2 border rounded-md" />
      </div>

      <!-- Password -->
      <!-- <div>
        <label class="block font-semibold mb-1">Password</label>
        <input formControlName="password" type="password" class="w-full p-2 border rounded-md" />
      </div> -->

      <div class="text-center">
        <button type="submit" class=" bg-[rgba(37,38,65,0.8)] hover:bg-[rgba(37,38,65,1.0)] text-white font-bold py-2 px-6 rounded-md">
          Save Changes
        </button>
      </div>
    </form>
  </div>
  `,
  styles: []
})
export class Profile {
  profileForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  userEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      // password: ['', Validators.minLength(6)],
    });

    // ✅ Retrieve email from localStorage correctly
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.userEmail = JSON.parse(userData).email || '';
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('No user email found in localStorage');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const updateData: UpdateUserDto = this.profileForm.value;

    if (!this.userEmail) {
      console.error('No user email available for update');
      return;
    }

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', updateData.name ?? '');
      formData.append('email', updateData.email ?? '');
      formData.append('phone', updateData.phone || '');
      // formData.append('password', updateData.password || '');
      formData.append('profileImage', this.selectedFile);
    
      this.userService.updateByEmail(this.userEmail, formData).subscribe({
        next: (res) => console.log('Updated with image:', res),
        error: (err) => console.error('Error:', err)
      });
    } else {
      const plainData = {
        name: updateData.name ?? '',
        email: updateData.email ?? '',
        phone: updateData.phone || '',
        // password: updateData.password || ''
      };
    
      this.userService.updateByEmail(this.userEmail, plainData).subscribe({
        next: (res) => console.log('Updated without image:', res),
        error: (err) => console.error('Error:', err)
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
