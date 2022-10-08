import { Component, OnInit } from '@angular/core';
import Resources from '../../class/resources.class';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['../../styles/main.scss', './privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  resources: Resources;
  empresaName: string;
  siteName: string;
  countryName: string;
  address: string;
  email: string;
  phone: string;
  displayPhone: string;

  ifPrivacy: boolean = true;

  constructor() {
    this.resources = new Resources();

    try {
      document.getElementsByClassName('estaotroo1')[0].remove();
      document.getElementsByClassName('estaotroo2')[0].remove();
    } catch (error) {}

    this.empresaName = this.resources.getEmpresaName();
    this.siteName = this.resources.getSiteName();
    this.countryName = this.resources.getCountryName();
    this.address = this.resources.getAddress();
    this.email = this.resources.getEmail();
    this.phone = this.resources.getPhone();
    this.displayPhone = this.resources.getDisplayPhone();
  }

  ngOnInit(): void {}

  switch(current: string) {
    if (current === 'privacy') {
      this.ifPrivacy = true;
    } else {
      this.ifPrivacy = false;
    }
  }
}
