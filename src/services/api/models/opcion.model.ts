import { Modulo } from './modulo.model';

export interface Opcion {
  id: number;
  nombre: string;
  ruta: string;
  icono?: string;
  moduloId: number;
  modulo?: Modulo;
  opcionPadreId?: number;
  opcionPadre?: Opcion;
  children?: Opcion[];
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}