import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMockService } from './api.mock.service';
import { MODULOS_MOCK } from './mocks/modulos.mock';
import { Modulo, CreateModuloDto, UpdateModuloDto } from './models/modulo.model';
import { SistemaService } from './sistema.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuloService extends ApiMockService {
  private modulos = [...MODULOS_MOCK];

  constructor(private sistemaService: SistemaService) {
    super();
  }

  getAll(): Observable<Modulo[]> {
    return this.okResponse([...this.modulos]);
  }

  getBySistema(sistemaId: number): Observable<Modulo[]> {
    const modulos = this.modulos.filter(m => m.sistemaId === sistemaId);
    return this.okResponse([...modulos]);
  }

  getById(id: number): Observable<Modulo | undefined> {
    const modulo = this.modulos.find(m => m.id === id);
    return this.okResponse(modulo ? {...modulo} : undefined);
  }

  create(dto: CreateModuloDto): Observable<Modulo> {
    return this.sistemaService.getById(dto.sistemaId).pipe(
      switchMap(sistema => {
        if (!sistema) {
          return this.handleError('Sistema no encontrado');
        }
        
        const newModulo: Modulo = {
          ...dto,
          id: Math.max(...this.modulos.map(m => m.id), 0) + 1,
          sistema: sistema,
          activo: dto.activo ?? true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        this.modulos.push(newModulo);
        return this.okResponse({...newModulo});
      })
    );
  }

  update(id: number, dto: UpdateModuloDto): Observable<Modulo> {
    const index = this.modulos.findIndex(m => m.id === id);
    if (index === -1) {
      return this.handleError('Módulo no encontrado');
    }
    
    const updated = {
      ...this.modulos[index],
      ...dto,
      updatedAt: new Date()
    };
    
    this.modulos[index] = updated;
    return this.okResponse({...updated});
  }

  delete(id: number): Observable<boolean> {
    const index = this.modulos.findIndex(m => m.id === id);
    if (index === -1) {
      return this.okResponse(false);
    }
    
    this.modulos.splice(index, 1);
    return this.okResponse(true);
  }

  toggleStatus(id: number): Observable<Modulo> {
    const modulo = this.modulos.find(m => m.id === id);
    if (!modulo) {
      return this.handleError('Módulo no encontrado');
    }
    
    modulo.activo = !modulo.activo;
    modulo.updatedAt = new Date();
    
    return this.okResponse({...modulo});
  }
}