import { Sistema } from './sistema.model';
import { Opcion } from './opcion.model'

export interface Modulo {
  id: number;
  nombre: string;
  ruta: string;
  icono?: string;
  sistemaId: number;
  sistema?: Sistema;
  moduloPadreId?: number;
  moduloPadre?: Modulo;
  opciones?: Opcion[];
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateModuloDto {
  nombre: string;
  ruta: string;
  icono?: string;
  sistemaId: number;
  moduloPadreId?: number;
  activo?: boolean;
}

export interface UpdateModuloDto extends Partial<CreateModuloDto> {}