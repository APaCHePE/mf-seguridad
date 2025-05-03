import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Sistema } from '../../../../../services/api/models/sistema.model';
import { SistemaService } from '../../../../../services/api/sistema.service';
import { TableConfig, TableColumn, TableAction } from '../../../../shared/models/table-config.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { NgClass, NgIf, NgComponentOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component'
import { StatusTagComponent } from '../../../../shared/components/status-tag/status-tag.component'

@Component({
  selector: 'app-sistema-list',
  templateUrl: './sistema-list.component.html',
  styleUrls: ['./sistema-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [DynamicTableComponent, StatusTagComponent, ConfirmDialogModule, Toast, FormsModule, NgClass],
  providers: [ConfirmationService, MessageService]
})
export class SistemaListComponent implements OnInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<any>;

  sistemas: Sistema[] = [];
  loading = true;
  tableConfig!: TableConfig;
  filterValue: string = '';

  constructor(
    private sistemaService: SistemaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initTableConfig();
    this.loadSistemas();
  }
  ngAfterViewInit(): void {
    console.log('Icon Template:', this.iconTemplate); // 👈 debería ser un objeto TemplateRef
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
          iconPrefix: 'pi', // Prefix para los iconos de PrimeNG
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
          field: 'codigo', 
          header: 'Código', 
          type: 'text',
          sortable: true,
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

  loadSistemas(): void {
    this.loading = true;
    this.sistemaService.getAll().subscribe({
      next: (sistemas) => {
        this.sistemas = sistemas;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.showError('Error al cargar sistemas', err.error?.message || 'Intente nuevamente');
      }
    });
  }

  onTableAction(event: {action: string, data: Sistema}): void {
    switch(event.action) {
      case 'edit':
        this.editSistema(event.data);
        break;
      case 'toggle':
        this.toggleStatus(event.data);
        break;
      case 'delete':
        this.confirmDelete(event.data);
        break;
    }
  }

  editSistema(sistema: Sistema): void {
    // Implementar navegación a edición
    console.log('Editar sistema:', sistema);
    this.messageService.add({
      severity: 'info',
      summary: 'Editar',
      detail: `Editando sistema: ${sistema.nombre}`,
      life: 3000
    });
  }

  toggleStatus(sistema: Sistema): void {
    this.sistemaService.toggleStatus(sistema.id).subscribe({
      next: (updated) => {
        const index = this.sistemas.findIndex(s => s.id === updated.id);
        if (index !== -1) {
          this.sistemas[index] = updated;
        }
        this.showSuccess('Estado actualizado', `Sistema ${updated.activo ? 'activado' : 'desactivado'}`);
      },
      error: (err) => {
        this.showError('Error al cambiar estado', err.error?.message || 'Intente nuevamente');
      }
    });
  }

  confirmDelete(sistema: Sistema): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el sistema "${sistema.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.deleteSistema(sistema);
      }
    });
  }

  deleteSistema(sistema: Sistema): void {
    this.sistemaService.delete(sistema.id).subscribe({
      next: () => {
        this.sistemas = this.sistemas.filter(s => s.id !== sistema.id);
        this.showSuccess('Eliminado', 'Sistema eliminado correctamente');
      },
      error: (err) => {
        this.showError('Error al eliminar', err.error?.message || 'Intente nuevamente');
      }
    });
  }

  onSearch(event: string): void {
    this.filterValue = event;
    // Implementar lógica de filtrado si es necesario
  }

  showNewDialog(): void {
    // Implementar lógica para nuevo sistema
    this.messageService.add({
      severity: 'info',
      summary: 'Nuevo Sistema',
      detail: 'Mostrar diálogo para nuevo sistema',
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

  private showError(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 5000
    });
  }
}