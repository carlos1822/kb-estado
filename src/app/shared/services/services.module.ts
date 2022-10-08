import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from './main.service';
import { SocketWebService } from './socket-web.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [SocketWebService, MainService],
})
export class ServicesModule { }
