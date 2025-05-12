export interface Usuario {
  idUsuario: number
  nombre: string
  apePaterno: string
  apeMaterno: string
  nombreCompleto?: string
  usuario: string
  estado?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateUsuarioDto {
  nombre: string
  apePaterno: string
  apeMaterno: string
  usuario?: string
}

export interface UpdateUsuarioDto extends Partial<CreateUsuarioDto> {}
