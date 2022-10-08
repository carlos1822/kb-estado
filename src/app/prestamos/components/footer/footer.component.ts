import { Component, OnInit } from '@angular/core';
import Resources from '../../class/resources.class';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  resources: Resources;
  phone: string = '';
  email: string = '';
  copyright: string = '';
  displayPhone: string = '';

  constructor() {
    this.resources = new Resources();
    this.phone = this.resources.getPhone();
    this.email = this.resources.getEmail();
    this.displayPhone = this.resources.getDisplayPhone();
    this.copyright = this.resources.getCopyright();
  }

  ngOnInit(): void {}
}
