import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor() {}

  scrollToElement(element: HTMLElement) {
    element?.scrollIntoView({ behavior: 'smooth' });
    // element.scrollIntoView({ block: 'end', behavior: "smooth" });
  }
}
