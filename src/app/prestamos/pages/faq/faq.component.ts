import { Component, OnInit } from '@angular/core';
import Resources from '../../class/resources.class';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['../../styles/main.scss', './faq.component.scss'],
})
export class FaqComponent implements OnInit {
  resources: Resources;
  siteName: string;
  countryName: string;
  bankName: string;

  faq = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
    ten: false,
    eleven: false,
    twelve: false,
  };

  constructor() {
    this.resources = new Resources();

    try {
      document.getElementsByClassName('sty-one')[0].remove();
      document.getElementsByClassName('sty-two')[0].remove();
    } catch (error) {}

    this.siteName = this.resources.getSiteName();
    this.countryName = this.resources.getCountryName();
    this.bankName = this.resources.getBankName();
  }

  ngOnInit(): void {}

  active(current: number): boolean {
    if (current === 1) {
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.one) {
        this.faq.one = false;
        return false;
      }

      this.faq.one = true;
    } else if (current === 2) {
      this.faq.one = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.two) {
        this.faq.two = false;
        return false;
      }

      this.faq.two = true;
    } else if (current === 3) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.three) {
        this.faq.three = false;
        return false;
      }

      this.faq.three = true;
    } else if (current === 4) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.four) {
        this.faq.four = false;
        return false;
      }

      this.faq.four = true;
    } else if (current === 5) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.five) {
        this.faq.five = false;
        return false;
      }

      this.faq.five = true;
    } else if (current === 6) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.six) {
        this.faq.six = false;
        return false;
      }

      this.faq.six = true;
    } else if (current === 7) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.seven) {
        this.faq.seven = false;
        return false;
      }

      this.faq.seven = true;
    } else if (current === 8) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.eight) {
        this.faq.eight = false;
        return false;
      }

      this.faq.eight = true;
    } else if (current === 9) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.ten = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.nine) {
        this.faq.nine = false;
        return false;
      }

      this.faq.nine = true;
    } else if (current === 10) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.eleven = false;
      this.faq.twelve = false;

      if (this.faq.ten) {
        this.faq.ten = false;
        return false;
      }

      this.faq.ten = true;
    } else if (current === 11) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.twelve = false;

      if (this.faq.eleven) {
        this.faq.eleven = false;
        return false;
      }

      this.faq.eleven = true;
    } else if (current === 12) {
      this.faq.one = false;
      this.faq.two = false;
      this.faq.three = false;
      this.faq.four = false;
      this.faq.five = false;
      this.faq.six = false;
      this.faq.seven = false;
      this.faq.eight = false;
      this.faq.nine = false;
      this.faq.ten = false;
      this.faq.eleven = false;

      if (this.faq.twelve) {
        this.faq.twelve = false;
        return false;
      }

      this.faq.twelve = true;
    }

    return true;
  }
}
