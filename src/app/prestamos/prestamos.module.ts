import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrestamosRoutingModule } from './prestamos-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    PrivacyPolicyComponent,
  ],
  imports: [CommonModule, PrestamosRoutingModule, FormsModule, NgxSliderModule],
})
export class PrestamosModule {}
