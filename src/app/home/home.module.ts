import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../shared/services/services.module';

import { SocketWebService } from 'src/app/shared/services/socket-web.service';
// const socketWebService = new SocketWebService();

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ServicesModule
  ],
  // providers: [{provide: SocketWebService, useValue: socketWebService}],
})
export class HomeModule { }
