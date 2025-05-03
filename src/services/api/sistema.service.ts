import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMockService } from './api.mock.service';
import { SISTEMAS_MOCK } from './mocks/sistemas.mock';
import { Sistema, CreateSistemaDto, UpdateSistemaDto } from './models/sistema.model';

@Injectable({
  providedIn: 'root'
})
export class SistemaService extends ApiMockService {
  private sistemas = [...SISTEMAS_MOCK];

  getAll(): Observable<Sistema[]> {
    return this.okResponse([...this.sistemas]);
  }

  getById(id: number): Observable<Sistema | undefined> {
    const sistema = this.sistemas.find(s => s.id === id);
    return this.okResponse(sistema ? {...sistema} : undefined);
  }

  create(dto: CreateSistemaDto): Observable<Sistema> {
    const newSistema: Sistema = {
      ...dto,
      id: Math.max(...this.sistemas.map(s => s.id), 0) + 1,
      activo: dto.activo ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.sistemas.push(newSistema);
    return this.okResponse({...newSistema});
  }

  update(id: number, dto: UpdateSistemaDto): Observable<Sistema> {
    const index = this.sistemas.findIndex(s => s.id === id);
    if (index === -1) {
      return this.handleError('Sistema no encontrado');
    }
    
    const updated = {
      ...this.sistemas[index],
      ...dto,
      updatedAt: new Date()
    };
    this.sistemas[index] = updated;
    
    return this.okResponse({...updated});
  }

  delete(id: number): Observable<boolean> {
    const index = this.sistemas.findIndex(s => s.id === id);
    if (index === -1) {
      return this.okResponse(false);
    }
    
    this.sistemas.splice(index, 1);
    return this.okResponse(true);
  }

  toggleStatus(id: number): Observable<Sistema> {
    const sistema = this.sistemas.find(s => s.id === id);
    if (!sistema) {
      return this.handleError('Sistema no encontrado');
    }
    
    sistema.activo = !sistema.activo;
    sistema.updatedAt = new Date();
    
    return this.okResponse({...sistema});
  }
}