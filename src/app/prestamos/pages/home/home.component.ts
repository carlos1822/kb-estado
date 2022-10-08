import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import Resources from '../../class/resources.class';
import { Options } from '@angular-slider/ngx-slider';
import { ScrollService } from '../../service/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../styles/main.scss', './home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('calculatorM') calculatorM: ElementRef = {} as ElementRef;
  @ViewChild('calculatorD') calculatorD: ElementRef = {} as ElementRef;
  @ViewChild('requirements') requirements: ElementRef = {} as ElementRef;

  resources: Resources;
  ifGetBtn: boolean = true;
  showResult: boolean = false;
  bankName: string = '';
  email: string = '';

  currentAmount: string = '';
  total: string = '';
  date: string = '';

  options: any = {};
  innerWidth: number = window.innerWidth;

  constructor(private scrollService: ScrollService) {
    this.resources = new Resources();

    try {
      document.getElementsByClassName('sty-one')[0].remove();
      document.getElementsByClassName('sty-two')[0].remove();
    } catch (error) {}

    this.email = this.resources.getEmail();
    this.options = this.resources.getInitialAmounts();

    this.prestamoListener();
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
  }

  switchGetOrPayBtn(current: boolean) {
    this.ifGetBtn = current;
  }

  amountSliderEvent() {
    this.prestamoListener();
  }

  monthSliderEvent() {
    this.prestamoListener();
  }

  prestamoListener() {
    this.total = this.resources.getTotalAmount(
      this.options.amount.value,
      this.options.months.value
    );

    this.date = this.resources.carculeDate(this.options.months.value);
    this.currentAmount = this.resources.getCurrentAmount(
      this.options.amount.value
    );
  }

  showRequirements() {
    this.scrollToElement(this.requirements.nativeElement);
  }

  getCredit() {
    // 1275;
    // 1279;
    if (this.innerWidth < 1276) {
      this.scrollToElement(this.calculatorM.nativeElement);
    } else {
      this.scrollToElement(this.calculatorD.nativeElement);
    }

    this.showResult = true;
  }

  private scrollToElement(element: HTMLElement) {
    this.scrollService.scrollToElement(element);
  }
}
