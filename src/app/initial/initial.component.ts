import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';
import { TextStorage } from '../shared/class/text-storage';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css'],
})
export class InitialComponent implements OnInit {
  private textStorage: TextStorage;

  constructor(private router: Router, private mainSrv: MainService) {
    this.textStorage = new TextStorage();
    this.checkStatus();
  }

  ngOnInit(): void {}

  async checkStatus(): Promise<any> {
    try {
      const data: any = await this.mainSrv.getStatus();
      if (data && data.isOk) {
        localStorage.setItem('isOk', 'true');

        const texts: any = await this.mainSrv.getTexts();
        if (!texts || !texts.isOk) {
          this.router.navigate([this.getRoute()]);
          return false;
        }

        this.textStorage.setDynamicTexts(texts.config);
        this.textStorage.getDynamicTexts();
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
