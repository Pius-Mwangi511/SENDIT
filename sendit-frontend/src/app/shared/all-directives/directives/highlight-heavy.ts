// directives/highlight-heavy.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightHeavy]',
  standalone: true,
})
export class HighlightHeavyDirective implements OnInit {
  @Input() appHighlightHeavy!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlightHeavy > 20) {
      this.el.nativeElement.style.backgroundColor = '#f87171'; // red-400
    }
  }
}

