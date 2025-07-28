import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Home } from "./home/home/home";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingComponent } from './shared/component/loading/loading'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
imports: [RouterOutlet, LoadingComponent,CommonModule],
  template: `
    <!-- <app-home></app-home> -->
    <app-loading *ngIf="isLoading"></app-loading>
     
      <router-outlet></router-outlet>
      `,
  styles: ``
})
export class App {
  isLoading = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading = false;
      }
    });
  }
  
}
