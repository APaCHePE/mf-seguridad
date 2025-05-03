export interface Sistema {
  id: number;
  nombre: string;
  codigo: string;
  icono?: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSistemaDto {
  nombre: string;
  codigo: string;
  icono?: string;
  activo?: boolean;
}

export interface UpdateSistemaDto extends Partial<CreateSistemaDto> {}