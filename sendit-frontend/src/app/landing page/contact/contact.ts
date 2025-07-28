import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/component/header/header'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  template: `
  <app-header></app-header>
    <div class="max-w-2xl mx-auto p-6 text-black">
      <h1 class="text-4xl font-bold mb-6">📞 Contact Us</h1>

      <p class="mb-6">
        Need help? Have a suggestion? Get in touch with the SendIT team. We value your feedback and are here to assist you.
      </p>

      <form class="space-y-4">
        <div>
          <label class="block mb-1 font-semibold">Your Name</label>
          <input type="text" class="w-full p-2 rounded bg-gray-800 text-white border border-gray-600" placeholder="John Doe">
        </div>

        <div>
          <label class="block mb-1 font-semibold">Email Address</label>
          <input type="email" class="w-full p-2 rounded bg-gray-800 text-white border border-gray-600" placeholder="john@example.com">
        </div>

        <div>
          <label class="block mb-1 font-semibold">Message</label>
          <textarea rows="4" class="w-full p-2 rounded bg-gray-800 text-white border border-gray-600" placeholder="Write your message..."></textarea>
        </div>

        <button type="submit" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold">
          Send Message
        </button>
      </form>
    </div>
  `,
  styles: []
})
export class Contact{}

