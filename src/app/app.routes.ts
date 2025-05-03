import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'seguridad/dashboards',
        loadComponent: () =>
          import('./pages/dashboard/analytics.component').then(
            (c) => c.AnalyticsComponent
          ),
      },
      {
        path: 'seguridad/form-layout',
        loadComponent: () =>
          import('./pages/accesos/accesos.component').then(
            (m) => m.AccesosComponent
          ),
      },
      {
        path: 'seguridad/modulos',
        loadComponent: () =>
          import('./pages/sistema-modulo/sistema-modulo.component').then(
            (m) => m.SistemaModuloComponent
          ),
      },
      {
        path: 'seguridad/modulos2',
        loadComponent: () =>
          import('./pages/sistema-modulo2/modulos.component').then(
            (m) => m.ModulosComponent
          ),
      },
      // {
      //   path: 'seguridad/modulos2',
      //   loadComponent: () =>
      //     import('./pages/administracion-sistema/modulos/modulos.component').then(
      //       (m) => m.SistemasModulosComponent
      //     ),
      // },
      {
        path: 'seguridad/notfound',
        loadComponent: () =>
          import('./pages/notfound/notfound').then((c) => c.Notfound),
      },
    ],
  },
  { path: '**', redirectTo: 'seguridad/notfound' }
];
