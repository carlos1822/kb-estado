import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSound]'
})
export class SoundDirective {

  @Input() state: boolean = false;

  constructor(private elementRef: ElementRef) { 
    
  }

}
