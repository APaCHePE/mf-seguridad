import { Component, OnInit } from '@angular/core';
import { Sistema } from '../../../services/api/models/sistema.model';
import { SistemaService } from '../../../services/api/sistema.service';

@Component({
  selector: 'app-sistema-list',
  templateUrl: './sistema-list.component.html'
})
export class SistemaListComponent implements OnInit {
  sistemas: Sistema[] = [];
  loading = true;

  constructor(private sistemaService: SistemaService) {}

  ngOnInit(): void {
    this.loadSistemas();
  }

  loadSistemas(): void {
    this.loading = true;
    this.sistemaService.getAll().subscribe({
      next: (sistemas) => {
        this.sistemas = sistemas;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Mostrar mensaje de error
      }
    });
  }

  createSistema(): void {
    // Lógica para abrir diálogo de creación
  }

  editSistema(sistema: Sistema): void {
    // Lógica para abrir diálogo de edición
  }

  toggleStatus(sistema: Sistema): void {
    this.sistemaService.toggleStatus(sistema.id).subscribe({
      next: (updated) => {
        const index = this.sistemas.findIndex(s => s.id === updated.id);
        if (index !== -1) {
          this.sistemas[index] = updated;
        }
      },
      error: () => {
        // Mostrar mensaje de error
      }
    });
  }

  deleteSistema(sistema: Sistema): void {
    if (confirm(`¿Está seguro de eliminar el sistema "${sistema.nombre}"?`)) {
      this.sistemaService.delete(sistema.id).subscribe({
        next: (success) => {
          if (success) {
            this.sistemas = this.sistemas.filter(s => s.id !== sistema.id);
          }
        },
        error: () => {
          // Mostrar mensaje de error
        }
      });
    }
  }
}