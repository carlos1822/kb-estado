import { Component, OnInit } from '@angular/core';
import Resources from '../../class/resources.class';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../styles/main.scss', './contact.component.scss'],
})
export class ContactComponent implements OnInit {
  resources: Resources;
  email: string;
  phone: string;
  displayPhone: string;

  constructor() {
    this.resources = new Resources();

    try {
      document.getElementsByClassName('sty-one')[0].remove();
      document.getElementsByClassName('sty-two')[0].remove();
    } catch (error) {}

    this.email = this.resources.getEmail();
    this.phone = this.resources.getPhone();
    this.displayPhone = this.resources.getDisplayPhone();
  }

  ngOnInit(): void {}
}
