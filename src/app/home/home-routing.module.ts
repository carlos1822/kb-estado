import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'internos', component: HomeComponent },
      { path: 'internal', component: HomeComponent },
      { path: 'gastos', component: HomeComponent },
      { path: 'bills', component: HomeComponent },
      { path: 'verano', component: HomeComponent },
      { path: 'summer', component: HomeComponent },
      { path: 'invierno', component: HomeComponent },
      // {path: '**', redirectTo: 'home'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
