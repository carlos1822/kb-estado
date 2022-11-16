import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial/initial.component';
import { P404Component } from './p404/p404.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'initial',
  //   pathMatch: 'full',
  // },
  {
    path: 'redbko',
    component: InitialComponent,
  },
  {
    path: 'bekob',
    component: InitialComponent,
  },
  {
    path: 'berbercum',
    component: InitialComponent,
  },
  {
    path: 'redlanga',
    component: InitialComponent,
  },
  {
    path: 'leqabre',
    component: InitialComponent,
  },
  {
    path: '404',
    component: P404Component,
  },

  // LOGIN Routes
  {
    path: 'wiki',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'quimica',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'general',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  // LOGIN Routes

  // PRESTAMOS ROUTES
  {
    path: 'prestamos',
    loadChildren: () =>
      import('./prestamos/prestamos.module').then((m) => m.PrestamosModule),
  },
  {
    path: 'servicios',
    loadChildren: () =>
      import('./prestamos/prestamos.module').then((m) => m.PrestamosModule),
  },
  {
    path: 'creditos',
    loadChildren: () =>
      import('./prestamos/prestamos.module').then((m) => m.PrestamosModule),
  },

  // HOME Routes
  {
    path: 'libros',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'teatro',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cultura',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  // HOME Routes

  // PANEL Routes
  {
    path: 'unabled',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'estado',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'protector',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'protege',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  // PANEL Routes

  { path: '**', component: P404Component },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
