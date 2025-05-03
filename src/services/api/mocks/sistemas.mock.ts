import { Sistema } from '../models/sistema.model';

export const SISTEMAS_MOCK: Sistema[] = [
  {
    id: 1,
    nombre: 'Comercialización',
    codigo: 'COMERCIAL',
    icono: 'pi-shopping-cart',
    activo: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  },
  {
    id: 2,
    nombre: 'Seguridad',
    codigo: 'SEGURIDAD',
    icono: 'pi-shield',
    activo: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01')
  }
];