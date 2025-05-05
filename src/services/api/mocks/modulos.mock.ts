import { Modulo } from '../models/modulo.model';
import { SISTEMAS_MOCK } from './sistemas.mock';

export const MODULOS_MOCK: Modulo[] = [
  {
    id: 1,
    nombre: 'Consultas',
    ruta: '/consultas',
    icono: 'pi-search', // Puedes cambiar el icono si lo deseas
    sistemaId: 1, // Asigna el sistemaId correspondiente
    // Suponiendo que tienes un mock para sistemas llamado SISTEMAS_MOCK
    sistema: SISTEMAS_MOCK[0], // Reemplaza con el sistema real
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    nombre: 'Administración',
    ruta: '/administracion',
    icono: 'pi-cog', // Puedes cambiar el icono
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    nombre: 'Catastro',
    ruta: '/catastro',
    icono: 'pi-map-marker', // Puedes cambiar el icono
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    nombre: 'Facturación',
    ruta: '/facturacion',
    icono: 'pi-file-excel', // Puedes cambiar el ícono
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    nombre: 'Medición',
    ruta: '/medicion',
    icono: 'pi-plus', // Puedes cambiar el ícono
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    nombre: 'Cobranza',
    ruta: '/cobranza',
    icono: 'pi-money-bill', // Puedes cambiar el ícono
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    nombre: 'Recaudación',
    ruta: '/recaudacion',
    icono: 'pi-dollar', // Puedes cambiar el ícono
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    nombre: 'Reclamos',
    ruta: '/reclamos',
    icono: 'pi-exclamation-triangle', // Puedes cambiar el ícono
    sistemaId: 1,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    nombre: 'Indicadores',
    ruta: '/indicadores',
    icono: 'pi-chart-line', // Puedes cambiar el ícono
    sistemaId: 3,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    nombre: 'Reportes',
    ruta: '/reportes',
    icono: 'pi-file-pdf', // Puedes cambiar el ícono
    sistemaId: 3,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    nombre: 'GisVma',
    ruta: '/gisvma',
    icono: 'pi-globe', // Puedes cambiar el ícono
    sistemaId: 3,
    sistema: SISTEMAS_MOCK[0],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]