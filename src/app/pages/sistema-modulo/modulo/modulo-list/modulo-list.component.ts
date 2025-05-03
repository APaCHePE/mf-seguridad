import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Modulo } from '../../../../../services/api/models/modulo.model';
import { ModuloService } from '../../../../../services/api/modulo.service';
import { SistemaService } from '../../../../../services/api/sistema.service';
import { TableConfig } from '../../../../shared/models/table-config.model';
import { Toast } from 'primeng/toast';
import { StatusTagComponent } from '../../../../shared/components/status-tag/status-tag.component'
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component'
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modulo-list',
  templateUrl: './modulo-list.component.html',
  styleUrls: ['./modulo-list.component.scss'],
  imports: [DynamicTableComponent, StatusTagComponent,Toast, FormsModule, NgClass],
  providers: [ConfirmationService, MessageService]
})
export class ModuloListComponent implements OnInit {
  modulos: Modulo[] = [];
  sistemas: any[] = []; // Para el dropdown de sistemas
  loading = true;
  tableConfig!: TableConfig;
  filterValue: string = '';

  constructor(
    private moduloService: ModuloService,
    private sistemaService: SistemaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initTableConfig();
    this.loadData();
  }

  initTableConfig(): void {
    this.tableConfig = {
      paginator: true,
      rows: 10,
      rowsPerPageOptions: [5, 10, 25, 50],
      columns: [
        { 
          field: 'icono', 
          header: '', 
          type: 'icon',
          iconPrefix: 'pi',
          width: '60px'
        },
        { 
          field: 'nombre', 
          header: 'Nombre', 
          type: 'text',
          sortable: true,
          width: '25%'
        },
        { 
          field: 'sistema.nombre', 
          header: 'Sistema', 
          type: 'text',
          sortable: true,
          width: '20%'
        },
        { 
          field: 'ruta', 
          header: 'Ruta', 
          type: 'text',
          width: '15%'
        },
        { 
          field: 'activo', 
          header: 'Estado', 
          type: 'status',
          width: '120px',
          tagTrueLabel: 'Activo',
          tagFalseLabel: 'Inactivo',
          tagTrueSeverity: 'success',
          tagFalseSeverity: 'danger'
        }
      ],
      actions: [
        { name: 'edit', icon: 'pi pi-pencil', severity: 'info', tooltip: 'Editar' },
        { name: 'toggle', icon: 'pi pi-eye-slash', severity: 'warn', tooltip: 'Cambiar estado' },
        { name: 'delete', icon: 'pi pi-trash', severity: 'danger', tooltip: 'Eliminar' }
      ]
    };
  }

  loadData(): void {
    this.loading = true;
    
    // Cargar sistemas primero para el dropdown
    this.sistemaService.getAll().subscribe({
      next: (sistemas) => {
        this.sistemas = sistemas.map(s => ({
          label: s.nombre,
          value: s.id
        }));
        
        // Luego cargar módulos
        this.moduloService.getAll().subscribe({
          next: (modulos) => {
            this.modulos = modulos;
            this.loading = false;
          },
          error: (err) => this.handleError('Error al cargar módulos', err)
        });
      },
      error: (err) => this.handleError('Error al cargar sistemas', err)
    });
  }

  onTableAction(event: {action: string, data: Modulo}): void {
    switch(event.action) {
      case 'edit':
        this.editModulo(event.data);
        break;
      case 'toggle':
        this.toggleStatus(event.data);
        break;
      case 'delete':
        this.confirmDelete(event.data);
        break;
    }
  }

  editModulo(modulo: Modulo): void {
    console.log('Editar módulo:', modulo);
    this.messageService.add({
      severity: 'info',
      summary: 'Editar',
      detail: `Editando módulo: ${modulo.nombre}`,
      life: 3000
    });
  }

  toggleStatus(modulo: Modulo): void {
    this.moduloService.toggleStatus(modulo.id).subscribe({
      next: (updated) => {
        const index = this.modulos.findIndex(m => m.id === updated.id);
        if (index !== -1) {
          this.modulos[index] = updated;
        }
        this.showSuccess('Estado actualizado', `Módulo ${updated.activo ? 'activado' : 'desactivado'}`);
      },
      error: (err) => this.handleError('Error al cambiar estado', err)
    });
  }

  confirmDelete(modulo: Modulo): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el módulo "${modulo.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => this.deleteModulo(modulo)
    });
  }

  deleteModulo(modulo: Modulo): void {
    this.moduloService.delete(modulo.id).subscribe({
      next: () => {
        this.modulos = this.modulos.filter(m => m.id !== modulo.id);
        this.showSuccess('Eliminado', 'Módulo eliminado correctamente');
      },
      error: (err) => this.handleError('Error al eliminar', err)
    });
  }

  onSearch(event: string): void {
    this.filterValue = event;
    // Implementar lógica de filtrado si es necesario
  }

  showNewDialog(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Nuevo Módulo',
      detail: 'Mostrar diálogo para nuevo módulo',
      life: 3000
    });
  }

  private showSuccess(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: 3000
    });
  }

  private handleError(summary: string, error: any): void {
    this.loading = false;
    this.messageService.add({
      severity: 'error',
      summary,
      detail: error.error?.message || 'Intente nuevamente',
      life: 5000
    });
  }
}