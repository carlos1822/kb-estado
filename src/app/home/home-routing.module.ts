import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', component: HomeComponent },
      { path: 'cine', component: HomeComponent },
      { path: 'deportes', component: HomeComponent },
      { path: 'chat', component: HomeComponent },
      { path: 'cool', component: HomeComponent },
      { path: 'cursor', component: HomeComponent },
      { path: 'modem', component: HomeComponent },
      { path: 'interfaz', component: HomeComponent },
      // {path: '**', redirectTo: 'home'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
