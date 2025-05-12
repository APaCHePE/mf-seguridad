import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { DialogModule } from 'primeng/dialog'
import { NgClass } from '@angular/common'
import { ToastModule } from 'primeng/toast'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { ConfirmDialogModule } from 'primeng/confirmdialog'

import { TableConfig } from '../../../shared/models/table-config.model'
import { Usuario } from '../../../../services/api/models/usuario.model'
  import { UsuarioService } from '../../../../services/api/usuario.service'
// import { SistemaFormComponent } from 'sistema-form/sistema-form.component'
import { StatusTagComponent } from '../../../shared/components/status-tag/status-tag.component'
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component'
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component'
import { UsuarioFormNewComponent } from '../usuario-form/usuario-form-new.component'
import { UsuarioFormEditComponent } from '../usuario-form/usuario-form-edit.component'

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    DynamicTableComponent,
    StatusTagComponent,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    NgClass,
    DialogModule,
    ButtonModule,
    InputTextModule,
    UsuarioFormComponent,
    UsuarioFormNewComponent,
    UsuarioFormEditComponent,
    // SistemaFormComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent implements OnInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<any>

  dialogNewVisible = false

  dialogEditVisible = false
  currentSistema: Usuario | null = null
  disabledFields: string[] = []

  usuarios: Usuario[] = []
  loading = true
  tableConfig!: TableConfig
  filterValue: string = ''

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.initTableConfig()
    this.loadSistemas()
  }

  initTableConfig(): void {
    this.tableConfig = {
      paginator: true,
      rows: 10,
      rowsPerPageOptions: [5, 10, 25, 50],
      columns: [
        {
          field: 'usuario',
          header: 'Usuario',
          type: 'text',
          iconPrefix: 'pi',
          width: '10%',
        },
        {
          field: 'nombreCompleto',
          header: 'Nombre',
          type: 'text',
          sortable: true,
          width: '25%',
        },
        {
          field: 'activo',
          header: 'Estado',
          type: 'status',
          width: '120px',
          tagTrueLabel: 'Activo',
          tagFalseLabel: 'Inactivo',
          tagTrueSeverity: 'success',
          tagFalseSeverity: 'danger',
        },
      ],
      actions: [
        {
          name: 'edit',
          icon: 'pi pi-pencil',
          severity: 'info',
          tooltip: 'Editar',
        },
        {
          name: 'toggle',
          icon: 'pi pi-eye-slash',
          severity: 'warn',
          tooltip: 'Cambiar estado',
        },
        {
          name: 'delete',
          icon: 'pi pi-trash',
          severity: 'danger',
          tooltip: 'Eliminar',
        },
      ],
    }
  }

  loadSistemas(): void {
    this.loading = true
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data.map((usuario) => ({
          ...usuario,
          nombreCompleto: `${usuario.nombre} ${usuario.apePaterno} ${usuario.apeMaterno}`,
        }))
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.showError(
          'Error al cargar sistemas',
          err.error?.message || 'Intente nuevamente',
        )
      },
    })
  }

  onTableAction(event: { action: string; data: Usuario }): void {
    switch (event.action) {
      case 'edit':
        this.showFormEditDialog(event.data)
        break
      case 'toggle':
        this.toggleStatus(event.data)
        break
      case 'delete':
        this.confirmDelete(event.data)
        break
    }
  }

  toggleStatus(Usuario: Usuario): void {
    this.usuarioService.toggleStatus(Usuario.idUsuario).subscribe({
      next: (updated) => {
        const index = this.usuarios.findIndex(
          (s) => s.idUsuario === updated.idUsuario,
        )
        if (index !== -1) this.usuarios[index] = updated
        this.showSuccess(
          'Estado actualizado',
          `Usuario ${updated.estado ? true : false}`,
        )
      },
      error: (err) => {
        this.showError(
          'Error al cambiar estado',
          err.error?.message || 'Intente nuevamente',
        )
      },
    })
  }

  confirmDelete(sistema: Usuario): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el sistema "${sistema.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => this.deleteSistema(sistema),
    })
  }

  deleteSistema(usuario: Usuario): void {
    this.usuarioService.delete(usuario.idUsuario).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(
          (s) => s.idUsuario !== usuario.idUsuario,
        )
        this.showSuccess('Eliminado', 'Sistema eliminado correctamente')
      },
      error: (err) => {
        this.showError(
          'Error al eliminar',
          err.error?.message || 'Intente nuevamente',
        )
      },
    })
  }

  showFormNewDialog(): void {
    this.currentSistema = null
    this.disabledFields = []
    this.dialogNewVisible = true
  }

  showFormEditDialog(usuario: Usuario): void {
    this.currentSistema = usuario
    this.disabledFields = ['codigo']
    this.dialogEditVisible = true
  }

  handleSubmit(sistemaData: Usuario): void {
    console.log('Nuevo usuario')

    this.dialogNewVisible = false
    const observable = this.currentSistema
      ? this.usuarioService.update(this.currentSistema.idUsuario, sistemaData)
      : this.usuarioService.create(sistemaData)

    observable.subscribe({
      next: () => {
        this.loadSistemas()
        this.showSuccess(
          this.currentSistema ? 'Actualizado' : 'Creado',
          `Sistema "${sistemaData.nombre}" ${
            this.currentSistema ? 'actualizado' : 'creado'
          } correctamente`,
        )
      },
      error: (err) =>
        this.showError('Error', err.error?.message || 'Intente nuevamente'),
    })
  }

  private showSuccess(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: 3000,
    })
  }

  private showError(summary: string, detail: string): void {
    this.messageService.add({ severity: 'error', summary, detail, life: 5000 })
  }
  // showFormNewDialog(): void {
  //   // Implementar lógica para nuevo sistema
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Nuevo Sistema',
  //     detail: 'Mostrar diálogo para nuevo sistema',
  //     life: 3000,
  //   });
  // }
  onSearch(event: string): void {
    this.filterValue = event
    // Implementar lógica de filtrado si es necesario
  }

  display: boolean = false
  open() {
    this.display = true
  }

  close() {
    this.display = false
  }
}
