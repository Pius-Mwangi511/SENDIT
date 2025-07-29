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
    <h1 class="text-3xl font-bold mb-4 text-center mt-10">About SendIT</h1>
      <div class="grid grid-cols-2 gap-4 bg-[rgba(37,38,65,0.1)] w-full border rounded-xl shadow-xl">
      
        <div class="p-5 ">
           
            <p class="mb-6 mt-10 text-xl">
           <strong>SendIT</strong> is a modern, fast, and reliable parcel delivery service that connects clients across different locations.
              Our platform empowers individuals and businesses to send and receive parcels with real-time tracking, transparent pricing,
              and seamless customer support.
           </p>
        </div>
        <div class="p-5">
          <img src="assets/images/delcar.jpg" alt="about" class="h-[300px] border rounded-xl shadow-2xl">
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
      <ul class="list-disc pl-6 mb-6 text-xl space-y-2 text-orange-600">
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

      <h2 class="text-2xl font-semibold flex justify-center mt-8 mb-2"> How It Works</h2>
      <div class="flex justify-center mt-[100px]">
          <div class="border rounded-xl shadow-2xl bg-[rgba(47,50,125,1.0)] h-[250px] w-[300px] m-5"> 
             <div class=" flex justify-center ">
               <h1 class="border rounded-full bg-white border-[rgba(47,50,125,1.0)] text-center text-2xl p-1 pr-3 pl-3 mt-[-20px]" >1</h1>
            </div>
            <div class=" text-white">
              <h1 class="flex justify-center text-xl font-bold  text-center mt-6">Create an account</h1>
              <p class="flex justify-center  text-center mt-6">sign up in seconds with <br>your email password phone <br> number and your address</p>
            </div>
          </div>

          <div class="border rounded-xl shadow-2xl h-[250px] w-[300px] m-5"> 
             <div class=" flex justify-center ">
               <h1 class="border rounded-full bg-white-600 text-center text-2xl p-1 pr-3 pl-3 mt-[-20px]" >2</h1>
            </div>
            <div >
              <h1 class="flex justify-center text-xl font-bold text-[rgba(47,50,125,1.0)] text-center mt-6">send the parcel</h1>
              <p class="flex justify-center text-[rgba(47,50,125,1.0)] text-center mt-6">Enter pick up and  and <br> delivery details and we will handle <br> the rest</p>
            </div>
          </div>

          <div class="border rounded-xl shadow-2xl bg-[rgba(47,50,125,1.0)] h-[250px] w-[300px] m-5"> 
             <div class=" flex justify-center ">
               <h1 class="border rounded-full bg-cyan-600 text-center text-2xl p-1 pr-3 pl-3 mt-[-20px]" >3</h1>
            </div>
            <div >
              <h1 class="flex justify-center text-xl font-bold text-white text-center mt-6">Track Real Time</h1>
              <p class="flex justify-center text-white text-center mt-6">Follow your parcel on <br> our live map and get <br> notified</p>
            </div>
          </div>

          <div class="border rounded-xl shadow-2xl h-[250px] w-[300px] m-5"> 
             <div class=" flex justify-center ">
               <h1 class="border rounded-full bg-cyan-500 text-center text-2xl p-1 pr-3 pl-3 mt-[-20px]" >4</h1>
            </div>
            <div >
              <h1 class="flex justify-center text-xl font-bold text-[rgba(47,50,125,1.0)] text-center mt-6">delivery Confirmed</h1>
              <p class="flex justify-center text-[rgba(47,50,125,1.0)] text-center mt-6">Your recipient is <br> notified <br> once it is delivered</p>
            </div>
          </div>

          

        </div>
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

