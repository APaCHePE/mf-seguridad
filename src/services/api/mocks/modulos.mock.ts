import { Modulo } from '../models/modulo.model';
import { SISTEMAS_MOCK } from './sistemas.mock';

export const MODULOS_MOCK: Modulo[] = [
  {
    id: 1,
    nombre: 'Comercial',
    ruta: '/comercial',
    icono: 'pi-chart-bar',
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: 2,
    nombre: 'Recaudación',
    ruta: '/recaudacion',
    icono: 'pi-money-bill',
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: 3,
    nombre: 'Administración de Sistema',
    ruta: '/admin-sistema',
    icono: 'pi-cog',
    sistemaId: 2,
    sistema: SISTEMAS_MOCK[1],
    activo: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: 4,
    nombre: 'Gestión de Usuarios',
    ruta: '/gestion-usuarios',
    icono: 'pi-users',
    sistemaId: 2,
    sistema: SISTEMAS_MOCK[1],
    activo: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  }
];