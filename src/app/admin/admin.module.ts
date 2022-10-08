import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../shared/services/services.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './pages/admin.component';
import { SocketIoConfig } from 'ngx-socket-io';
import { ClipboardModule } from 'ngx-clipboard';
import { SoundDirective } from './directive/sound.directive';

import { NgxPaginationModule } from 'ngx-pagination';

const config: SocketIoConfig = { url: '', options: {} };

@NgModule({
  declarations: [AdminComponent, SoundDirective],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ServicesModule,
    NgxPaginationModule,
    ClipboardModule,
  ],
})
export class AdminModule {}
