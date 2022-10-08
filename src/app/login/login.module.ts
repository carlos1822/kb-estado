import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login.component';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../shared/services/services.module';

import { SocketWebService } from 'src/app/shared/services/socket-web.service';
import { SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: '', options: {} };

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ServicesModule
  ]
})
export class LoginModule { }
