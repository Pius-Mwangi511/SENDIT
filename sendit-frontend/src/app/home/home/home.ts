import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { Header } from '../../shared/component/header/header'; 
import { More } from "../more/more";

@Component({
  selector: 'app-home',
  imports: [Hero, Header, More],
  template: `
      
      <app-header></app-header>
      <app-hero></app-hero>
      <app-more></app-more>
  `,
  styles: ``
})
export class Home {

}
