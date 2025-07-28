// src/app/components/loading/loading.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div class="text-center">
        <div class="loader mb-2"></div>
        <p class="text-lg font-semibold text-gray-800">Loading...</p>
      </div>
    </div>
  `,
  styles: [`
    .loader {
      border: 4px solid #ccc;
      border-top: 4px solid #252641;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: auto;
    }

    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoadingComponent {}
