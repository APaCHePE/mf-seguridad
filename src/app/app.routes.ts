import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [
  // {
  //   path: 'comercial/consultas/dashboard',
  //   loadComponent: () => import('./prueba/prueba.component'),
  // },
  // { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'seguridad/dashboards',
        loadComponent: () => import('./pages/dashboard/analytics/analytics.component').then((c) => c.AnalyticsComponent),
      },
      // {
      //   path: 'comercial/consultas/nuevo',
      //   loadComponent: () => import('./nuevo/nuevo.component').then(m => m.NuevoComponent),
      // },
      // {
      //   path: 'comercial/consultas/modificar',
      //   loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent),
      // },
      // {
      //   path: 'comercial/configurar',
      //   loadComponent: () => import('.//configurar.component').then(m => m.ConfigurarComponent),
      // },
    ]
  },
  // {
  //   path: 'productos/modificar',
  //   loadComponent: () => import('./modificar/modificar.component'),
  // },
  // {
  //   path: 'productos/exportar',
  //   loadComponent: () => import('./menu/menu.component'),
  // },
  // {
  //   path: 'productos/configurar',
  //   loadComponent: () => import('./layout/layout.component'),
  // },
  {
    path: '**',
    component: EmptyRouteComponent,
  },
];