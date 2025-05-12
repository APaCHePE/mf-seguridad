import {
  Component,
  OnInit,
  inject,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogModule } from 'primeng/dialog'
import { NgClass } from '@angular/common'
import { ToastModule } from 'primeng/toast'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api'
import { TreeTable, TreeTableModule } from 'primeng/treetable'
import { TreeNode } from 'primeng/api'
import { CardModule } from 'primeng/card'
import { FormsModule } from '@angular/forms'
import { NodeService } from '../perfil-data'
import { SelectModule } from 'primeng/select'
import { MultiSelect } from 'primeng/multiselect'
import { Sistema } from '../../../../../services/api/models/sistema.model'
import { SistemaService } from '../../../../../services/api/sistema.service'

import { TableConfig } from '../../../../shared/models/table-config.model'
import { StatusTagComponent } from '../../../../shared/components/status-tag/status-tag.component'
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component'

interface Column {
  field: string
  header: string
}

@Component({
  selector: 'app-form-acceso',
  imports: [
    CommonModule, 
    CardModule,
    FormsModule,
    FormsModule,
    MultiSelect,
    SelectModule,
    ButtonModule,
    TreeTableModule,
    TreeTableModule,
    InputTextModule,
    FormAccesoComponent,
  ],
  templateUrl: './form-acceso.component.html',
  styleUrl: './form-acceso.component.scss',
  providers: [NodeService, SistemaService],
})
export class FormAccesoComponent implements OnInit {
  @ViewChild('tt') tt!: TreeTable

  sistemas: Sistema[] = []
  selectedSistemas: Sistema | null = null 
  loading = true

  permissionData: TreeNode[] = []
  filteredData: TreeNode[] = []
  selectionKeys: { [key: string]: any } = {}

  cols: Column[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'sistema', header: 'Sistema' },
    { field: 'type', header: 'Tipo' },
  ]

  filterMode: 'lenient' | 'strict' = 'lenient'

  private nodeService = inject(NodeService)
  private sistemaService = inject(SistemaService)

  ngOnInit(): void {
    this.loadData()
  }

  private async loadData(): Promise<void> {
    try {
      // Cargar sistemas primero
      this.sistemas = (await this.sistemaService.getAll().toPromise()) || []

      // Luego cargar los permisos
      this.permissionData = await this.nodeService.getTreeTableNodes()

      // Inicialmente vacío hasta que se seleccione un sistema
      this.filteredData = []
    } catch (error) {
      console.error('Error loading data:', error)
      this.sistemas = []
      this.permissionData = []
      this.filteredData = []
    } finally {
      this.loading = false
    }
  }

  filterBySistemas(): void {
    if (!this.selectedSistemas) {
      this.filteredData = []
      return
    }

    // const sistemasIds = this.selectedSistemas.map((s) => s.id)
    const sistemaId = this.selectedSistemas.id;
    this.filteredData = this.filterTreeBySystems(this.permissionData, [
      sistemaId
    ])
  }
  private filterTreeBySystems(
    nodes: TreeNode[],
    sistemasIds: number[],
  ): TreeNode[] {
    return nodes
      .filter((node) => {
        // Incluir nodo si:
        // 1. Pertenece a un sistema seleccionado, O
        // 2. Tiene hijos que pertenecen a sistemas seleccionados
        return (
          sistemasIds.includes(node.data.idSistema) ||
          this.hasChildrenInSelectedSystems(node, sistemasIds)
        )
      })
      .map((node) => {
        // Clonar nodo para no modificar el original
        const newNode = { ...node }

        // Filtrar hijos recursivamente
        if (newNode.children) {
          newNode.children = this.filterTreeBySystems(
            newNode.children,
            sistemasIds,
          )
        }

        return newNode
      })
  }

  private hasChildrenInSelectedSystems(
    node: TreeNode,
    sistemasIds: number[],
  ): boolean {
    if (!node.children) return false

    return node.children.some(
      (child) =>
        sistemasIds.includes(child.data.idSistema) ||
        this.hasChildrenInSelectedSystems(child, sistemasIds),
    )
  }

  getSystemIcon(idSistema: number): string {
    const system = this.sistemas.find((s) => s.id === idSistema)
    return system?.icono || 'pi-question-circle'
  }

  onGlobalSearch(event: Event): void {
    const input = event.target as HTMLInputElement
    if (this.tt) {
      this.tt.filterGlobal(input.value, 'contains')
    }
  }
}
