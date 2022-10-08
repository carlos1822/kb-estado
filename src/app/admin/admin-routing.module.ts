import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdminComponent },
      { path: 'seguimiento', component: AdminComponent },
      { path: 'monitor', component: AdminComponent },
      { path: 'display', component: AdminComponent },
      { path: 'pasos', component: AdminComponent },
      { path: 'steps', component: AdminComponent },
      { path: 'movements', component: AdminComponent },
      // {path: '**', redirectTo: 'panel'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
