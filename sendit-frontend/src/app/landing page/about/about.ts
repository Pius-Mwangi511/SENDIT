import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/component/header/header'; 

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, Header],
  template: `
     <app-header></app-header>
    <div class=" p-6 text-black">
      <div class="grid grid-cols-2 gap-4 bg-[rgba(37,38,65,0.1)] w-full border rounded-xl shadow-xl">
        <div class="p-5">
           <h1 class="text-3xl font-bold mb-4 text-center mt-10">About SendIT</h1>
            <p class="mb-6 mt-10">
           <strong>SendIT</strong> is a modern, fast, and reliable parcel delivery service that connects clients across different locations.
              Our platform empowers individuals and businesses to send and receive parcels with real-time tracking, transparent pricing,
              and seamless customer support.
           </p>
        </div>
        <div class="p-5">
          <img src="assets/images/delcar.jpg" alt="about" class="h-[300px]">
        </div>
      </div>

      <h2 class="text-3xl font-semibold mt-8 mb-2 text-blue-600 text-center"> Our Mission</h2>
      <p class="mb-6 text-center text-xl">
        To simplify parcel delivery by providing a digital platform that enables safe, timely, and affordable logistics between clients,
        whether for personal or business needs.
      </p>
      <div class="grid grid-cols-2 gap-4 bg-[rgba(37,38,65,0.03)] w-full mt-[100px]">
      <div>
        <img src="assets/images/delcartoon.jpg" alt="about" class="h-[300px]">
      </div>
        <div>
      <h2 class="text-2xl font-semibold mt-8 mb-2"> What We Offer</h2>
      <ul class="list-disc pl-6 mb-6 text-xl space-y-2">
        <li>Client-to-Client Parcel Delivery</li>
        <li>Real-Time Parcel Tracking</li>
        <li>Secure Booking Process</li>
        <li>Delivery Notifications</li>
        <li>Dedicated Support</li>
      </ul>
      </div>
      
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-2">💡 Why Choose SendIT</h2>
      <ul class="list-disc pl-6 text-xl mb-6 space-y-2">
        <li>Fast delivery turnaround</li>
        <li>Friendly user interface</li>
        <li>Affordable and competitive rates</li>
        <li>Location-based delivery matching</li>
        <li>Built-in map visualization for delivery routes</li>
      </ul>
      <div class="grid grid-cols-2 gap-4 bg-gradient-to-b from-[rgba(41,185,231,0.0)] via-[rgba(41,185,231,0.1)] to-[rgba(153,153,153,0.1)] w-full mt-[100px]">
      <div>
        <img src="assets/images/all.png" alt="about" class="h-[300px]">
      </div>
      <div>
      <h2 class="text-2xl font-semibold mt-8 mb-2">👥 Who We Serve</h2>
      <ul class="list-disc pl-6 mb-6 text-xl space-y-2">
        <li>Individuals sending personal items</li>
        <li>Small businesses delivering products</li>
        <li>Students and remote workers sharing packages</li>
        <li>Families staying connected through physical deliveries</li>
      </ul>
      </div>
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-2"> How It Works</h2>
      <ol class="list-decimal pl-6 text-xl mb-6 space-y-2">
        <li>Sign Up & Log In</li>
        <li>Create a Parcel Request</li>
        <li>Track Parcel in Real Time</li>
        <li>Receive Notifications on Delivery Progress</li>
        <li>Confirm Delivery with One Click</li>
      </ol>
    </div>
    <div class="flex justify-evenly mt-[90px] bg-[rgba(37,38,65,1.0)] text-white mt-[300px]">
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
  styles: []
})
export class About{}

