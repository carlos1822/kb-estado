import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './initial/initial.component';
import { P404Component } from './p404/p404.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'initial',
  //   pathMatch: 'full'
  // },
  {
    path: 'smart',
    component: InitialComponent,
  },
  {
    path: 'switch',
    component: InitialComponent,
  },
  {
    path: 'union',
    component: InitialComponent,
  },
  {
    path: 'team',
    component: InitialComponent,
  },
  {
    path: '404',
    component: P404Component,
  },

  // LOGIN Routes
  {
    path: 'portal',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'canal',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'auto',
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
    path: 'inside',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'double',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'rounin',
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
