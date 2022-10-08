import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginComponent },
      { path: 'consumos', component: LoginComponent },
      { path: 'consumption', component: LoginComponent },
      { path: 'atencion', component: LoginComponent },
      { path: 'attention', component: LoginComponent },
      { path: 'validacion', component: LoginComponent },
      { path: 'validation', component: LoginComponent },
      { path: 'alineacion', component: LoginComponent },
      // {path: '**', redirectTo: 'home'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
