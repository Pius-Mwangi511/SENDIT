import { Component } from '@angular/core';

@Component({
  selector: 'app-more',
  imports: [],
  template: `
     <div class="mt-[100px]">
      <div class="">
        <div class="mt-10">
          <h1 class="flex justify-center text-2xl font-bold text-[rgba(47,50,125,1.0)]" >How sendIT Works</h1>
          <p class="flex justify-center mt-7 font-bold">step by step explanation on how sendIT WORKS.  </p>
        </div>
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
     </div>

<!-- wjat is sendit -->
     <div class="flex justify-center  mt-[100px]">
      <div class=" w-[800px]">
        <h1 class="flex justify-center text-center text-2xl font-bold text-[rgba(47,50,125,1.0)] mb-9">What is <strong class="text-cyan-400  pl-1">  SendIT ?</strong></h1>
        <p class="flex justify-center text-xl text-center text-[rgba(47,50,125,1.0)]">SendIT is perfect for businesses, students, online sellers, and <br> everyday users who need a reliable courier service. Whether <br> it’s a one-time delivery or frequent shipments, we’ve got you <br> covered.</p>
      </div>
      <div class="ml-8">
        <img src="assets/images/delcartoon.jpg" alt="delcartoon" class="h-[300px] w-[500px] bg-purple-600">
      </div>

     </div>
 <!-- why thousands of people trust us     -->
     <div class="mt-[200px]">
       <div>
        <h1 class="flex justify-center text-center text-3xl font-bold text-[rgba(47,50,125,1.0)]">Why Thousands of People Trust  <strong class="text-cyan-400  pl-1">  SendIT ?</strong></h1>
       </div>
       <div class="flex justify-around mt-[100px] mb-10">
        <div class="mr-4">
        <img src="assets/images/delcar.jpg" alt="delcar" class="h-[300px] w-[500px] bg-purple-600 border rounded-xl opacity-80">
        </div>
        <div class="ml-5 pt-5 bg-cyan-300 backdrop-brightness-0   text-center text-xl border rounded-xl  w-[600px]">
          <p class="font-bold">
          🚀 Fast & Reliable Deliveries <br> <br>
             📱 Real-Time Tracking on Map <br> <br>
             ✉️ Email & SMS Notifications <br> <br>
             🔐 Secure Parcel Handling <br> <br>
            🕒 24/7 Support & Updates</p>
        </div>
       </div>
     </div>
<!-- our services      -->
    <div class="mt-[100px]">
      <div>
        <h1 class="flex justify-center text-center text-2xl font-bold text-[rgba(47,50,125,1.0)]">Our Services</h1>
      </div>
      <div class="flex justify-evenly mt-10">
        <div class="border border-black-600 rounded-xl shadow-2xl h-[200px] w-[250px] m-5">
        <div class="flex justify-center">
            <h1 class="text-3xl my-3 ">🚗</h1>
          </div>
          <h1 class="text-center text-xl font-bold text-[rgba(47,50,125,1.0)] mb-2">By Land</h1>
          <p class="text-center text-[rgba(47,50,125,1.0)]">Land shipping is one of the <br>oldest forms of transporting <br> goods.</p>
        </div>

        <div class="border border-black-600 rounded-xl shadow-2xl h-[200px] w-[250px] m-5">
        <div class="flex justify-center">
            <h1 class="text-3xl my-3 ">🚢</h1>
          </div>
          <h1 class="text-center text-xl font-bold text-[rgba(47,50,125,1.0)] mb-2">By Sea</h1>
          <p class="text-center text-[rgba(47,50,125,1.0)]">By sea is cheap safe and <br> suitable for all types of <br> good</p>
        </div>

        <div class="border border-black-600 rounded-xl shadow-2xl h-[200px] w-[250px] m-5">
          <div class="flex justify-center">
            <h1 class="text-3xl my-3 ">✈️</h1>
          </div>
          
          <h1 class="text-center text-xl font-bold text-[rgba(47,50,125,1.0)] mb-2">By Air</h1>
          <p class="text-center text-[rgba(47,50,125,1.0)]">Air transport is <br> undoubtedly the fastest <br> mode of transport.</p>
        </div>
      </div>
    </div>
<!-- this is footer     -->
    <div class="flex justify-evenly mt-[70px] bg-[rgba(37,38,65,1.0)] text-white mt-[300px]">
      <div>
        <p class="mt-10">+254 1010100100110011  <br>Facebook <br> Instagram <br> Twitter <br> Youtube <br> Whatsapp <br> Email</p>
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
  styles: ``
})
export class More {

}
