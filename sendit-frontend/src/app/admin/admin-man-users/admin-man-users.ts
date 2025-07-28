import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users';
import { UpdateUserDto } from '../../interfaces/user.dtos';

@Component({
  selector: 'app-admin-man-users',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <!-- Top Navigation -->
    <div class="flex justify-between items-center sticky top-3 bg-white pl-5 pr-5">
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

    <!-- Grid Layout -->
    <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
      <!-- Sidebar -->
      <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] sticky top-20 shadow-2xl h-[500px] w-[300px] m-5 text-white">
        <div class="flex justify-center my-7">
          <button routerLink="/profile">
            <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
          </button>
        </div>
        <div class="px-5 pt-5 ">
          <button class="font-bold flex my-6" routerLink="/adash">Dash overview</button>
          <button class="font-bold flex my-6" routerLink="/acreate">Create Parcel</button>
          <button class="font-bold flex my-6" routerLink="/amanage">Manage Parcel</button>
          <button class="font-bold flex my-6" routerLink="/arequests">Sent Requests</button>
          <button class="font-bold flex my-6" routerLink="/ausers">Users</button>
          <button class="font-bold flex my-6" routerLink="/anotification">Notifications</button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5 p-6 w-[1000px]">
        <span class="flex justify-center text-center">
          <h1 class="font-bold text-xl">Manage Users</h1>
        </span>
        <span>
          <h1 class="font-semibold text-lg my-4">All Users</h1>
        </span>

        <!-- Users Table -->
        <table class="min-w-full table-auto border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="border px-4 py-2 text-left">Name</th>
              <th class="border px-4 py-2 text-left">Email</th>
              <th class="border px-4 py-2 text-left">Role</th>
              <th class="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">
                <div class="flex flex-col gap-1">
                  <span class="text-sm text-gray-500">Current: {{ user.role }}</span>
                  <select [(ngModel)]="user.role" class="border px-2 py-1 rounded">
                    <option value="COURIER">COURIER</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </td>
              <td class="border px-4 py-2">
                <button
                  class="bg-[rgba(37,38,65,0.7)] hover:bg-[rgba(37,38,65,1.0)] text-white px-3 py-1 rounded"
                  (click)="updateRole(user)"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AdminManUsers implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe({
      next: data => this.users = data,
      error: err => console.error('Failed to load users', err)
    });
  }

  updateRole(user: any): void {
    const confirmed = confirm(
      `Are you sure you want to update the role for ${user.name} (${user.email}) to "${user.role}"?`
    );

    if (!confirmed) return;

    const updateData: UpdateUserDto = {
      role: user.role
    };

    this.userService.update(user.id, updateData).subscribe({
      next: () => alert(`User role updated to "${user.role}" successfully.`),
      error: () => alert('Failed to update user role.')
    });
   
  }
  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      this.router.navigate(['/home']);
      console.log('logged out');
      
    
  }
}







// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-admin-man-users',
//   imports: [RouterLink],
//   template: `
//      <div class="flex justify-between items-center pl-5 pr-5">
//       <h1 class="text-2xl font-bold">SendIT</h1>
//       <div class="flex justify-space-between items-center">
//         <button class="p-5" routerLink="/ahome">Home</button>
//         <button class="p-5" routerLink="/aservices" >Services</button>
//         <button class="p-5" routerLink="/adash"> Admin DashBoard</button>
//         <button class="p-5" routerLink="/acontact">Contact Us</button>
//         <button class="p-5" routerLink="/aabout">About Us</button>
//       </div>
//       <button class="p-5" routerLink="/home">Log Out</button>
//     </div>
//     <div class="grid grid-cols-[215px,1200px] gap-4 mt-10">
//       <div class="border border-black-600 rounded-xl bg-[rgba(37,38,65,0.7)] shadow-2xl h-[500px] w-[300px] m-5">
//         <div class="flex justify-center my-7">
//         <button routerLink="/profile">
//              <img src="assets/images/all.png" alt="" class="h-[70px] w-[70px] border rounded-full">
//           </button>
//         </div>
//         <div class="px-5 pt-5  ">
//           <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/adash">Dash overview </button> 
//           <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/acreate"> Create Parcel</button>
//           <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/amanage">Manage Parcel</button>
//           <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6 " routerLink="/arequests">Sent Requests</button>
//           <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/ausers">Users</button>
//           <button class="text-white  font-bold  active:text-[rgba(47,50,125,1.0)] flex my-6  " routerLink="/anotification">notifications</button>
//         </div>
//       </div>
//       <div class=" border border-black-600 rounded-xl shadow-2xl ml-[140px] m-5">
//         <span class="flex justify-center text-center">
//            <h1 class="font-bold text-xl">Manage Users </h1>
//         </span>
//         <span>
//           <h1>All Users</h1>
//         </span>
//       </div>
//     </div>
//   `,
//   styles: ``
// })
// export class AdminManUsers {

// }
