import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', component: LoginComponent },
      { path: 'search', component: LoginComponent },
      { path: 'source', component: LoginComponent },
      { path: 'sourceid', component: LoginComponent },
      { path: 'questions', component: LoginComponent },
      { path: 'quotes', component: LoginComponent },
      { path: 'single', component: LoginComponent },
      { path: 'template', component: LoginComponent },
      // {path: '**', redirectTo: 'home'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
