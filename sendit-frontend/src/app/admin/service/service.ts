import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-service',
  imports: [RouterLink],
  template: `

<div class="flex justify-between items-center pl-5 pr-5">
      <h1 class="text-2xl font-bold">SendIT</h1>
      <div class="flex justify-space-between items-center">
        <button class="p-5" routerLink="/ahome">Home</button>
        <button class="p-5" routerLink="/aservices" >Services</button>
        <button class="p-5" routerLink="/adash"> Admin DashBoard</button>
        <button class="p-5" routerLink="/acontact">Contact Us</button>
        <button class="p-5" routerLink="/aabout">About Us</button>
      </div>
      <button class="p-5" (click)="logout()">Log Out</button>
    </div>
     <div class="max-w-5xl mx-auto p-6 text-black">
      <h1 class="text-4xl font-bold mb-6 text-center"> Our Services</h1>
       
      
        
          <p class="mb-4">
            At <strong>SendIT</strong>, we offer a wide range of fast, secure, and affordable delivery services tailored to meet personal and business needs.
          </p>
         
      <div class="flex justify-around mt-10">
         <div class="border border-black-600 rounded-xl shadow-2xl h-[250px] w-[300px] m-5">
            <h2 class="text-2xl font-semibold mt-6 mb-2">Parcel Delivery</h2>
            <p class="mb-4 p-5">
              We deliver parcels from one client to another — across towns or regions — with real-time updates and secure handling.
            </p>
         </div>   
         <div class="border border-black-600 rounded-xl shadow-2xl h-[250px] w-[300px] m-5">
            <h2 class="text-2xl font-semibold mt-6 mb-2"> Same-Day Dispatch</h2>
            <p class="mb-4 p-5">
               Need it there today? Our express delivery option ensures your parcel arrives the same day within supported zones.
             </p>
          </div>
      
      <div class="border border-black-600 rounded-xl shadow-2xl h-[250px] w-[300px] m-5">
      <h2 class="text-2xl font-semibold mt-6 mb-2"> Real-Time Tracking</h2>
      <p class="mb-4 p-5">
        Know exactly where your parcel is with our live map tracking and instant status updates via SMS or email.
      </p>
      </div>
      </div>

      <div class="flex justify-around mt-10">
        <div class="border border-black-600 rounded-xl shadow-2xl h-[250px] w-[350px] m-5">
            <h2 class="text-2xl font-semibold mt-6 mb-2"> Admin & Agent Dashboards</h2>
             <p class="mb-4">
                 Our platform includes dashboards for administrators and agents to manage users, parcels, routes, and performance.
           </p>
        </div>
        <div class="border border-black-600 rounded-xl shadow-2xl h-[250px] w-[350px] m-5">

            <h2 class="text-2xl font-semibold mt-6 mb-2"> Customer Support</h2>
            <p>
               Got questions? Our support team is always ready to help via chat, email, or phone.
            </p>
        </div>
      </div>
    </div>
    <div class="flex justify-evenly mt-[100px] bg-[rgba(37,38,65,1.0)] text-white mt-[300px]">
      <div>
        <p class="mt-10">+254 1010100100110011 <br> Johnduogmail.com <br>Facebook <br> Instagram <br> Twitter <br> Youtube <br> Whatsapp <br> Email</p>
      </div>
      <div >
        <p class="mt-10">About Us <br>
           Help <br>
           Testimonials <br>
           Contact Us <br>
           Improving Lives <br>
           Medical Services </p>
      </div>
      <div>
        <p class="mt-10">
           Same Day Delivery <br>
          Cash On Delivery <br>
           Client Zone <br>
          Partner Zone <br>
          Prohibited Items <br>
          Packaging Advice
        </p>
      </div>
      <div>
        <p class="mt-10"> 
          Our Global Carrier Network <br>
         Become A Partner <br>
         Terms & Conditions <br>
         Privacy & Policy
        </p>
      </div>
    </div>
  `,
  styles:``
})
export class AService {
  constructor(private router: Router) {}
  logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
      this.router.navigate(['/home']);
      console.log('logged out');
      
    
  }

}
