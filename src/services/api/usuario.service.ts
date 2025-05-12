import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiMockService } from './api.mock.service'
import { USUARIO_MOCK } from './mocks/usuarios.mock'
import {
  Usuario,
  CreateUsuarioDto,
  UpdateUsuarioDto,
} from './models/usuario.model'

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends ApiMockService {
  private usuarios: Usuario[] = [...USUARIO_MOCK]

  getAll(): Observable<Usuario[]> {
    return this.okResponse([...this.usuarios])
  }

  getById(id: number): Observable<Usuario | undefined> {
    const usuario = this.usuarios.find((u) => u.idUsuario === id)
    return this.okResponse(usuario ? { ...usuario } : undefined)
  }

  create(dto: CreateUsuarioDto): Observable<Usuario> {
    const newUsuario: Usuario = {
      ...dto,
      idUsuario: Math.max(...this.usuarios.map((u) => u.idUsuario), 0) + 1,
      usuario: dto.usuario ?? this.generarUsuario(dto),
      estado: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.usuarios.push(newUsuario)
    return this.okResponse({ ...newUsuario })
  }

  update(id: number, dto: UpdateUsuarioDto): Observable<Usuario> {
    const index = this.usuarios.findIndex((u) => u.idUsuario === id)
    if (index === -1) {
      return this.handleError('Usuario no encontrado')
    }

    const updated: Usuario = {
      ...this.usuarios[index],
      ...dto,
      updatedAt: new Date(),
    }

    this.usuarios[index] = updated
    return this.okResponse({ ...updated })
  }

  delete(id: number): Observable<boolean> {
    const index = this.usuarios.findIndex((u) => u.idUsuario === id)
    if (index === -1) {
      return this.okResponse(false)
    }

    this.usuarios.splice(index, 1)
    return this.okResponse(true)
  }

  toggleStatus(id: number): Observable<Usuario> {
    const usuario = this.usuarios.find((u) => u.idUsuario === id)
    if (!usuario) {
      return this.handleError('Usuario no encontrado')
    }

    usuario.estado = !usuario.estado
    usuario.updatedAt = new Date()

    return this.okResponse({ ...usuario })
  }

  private generarUsuario(dto: CreateUsuarioDto): string {
    return (
      (dto.nombre?.charAt(0) ?? 'x') + (dto.apePaterno?.split(' ')[0] ?? 'user')
    ).toLowerCase()
  }
}
