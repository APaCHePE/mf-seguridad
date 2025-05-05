import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { TreeTable, TreeTableModule } from 'primeng/treetable'
import { TreeNode } from 'primeng/api'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox'
import { ButtonModule } from 'primeng/button'
import { SelectModule } from 'primeng/select'
import { CardModule } from 'primeng/card'
import { NodeService } from './perfil-data'
// import { SystemService } from './perfil-data'
// import { AccessService } from './perfil-data'

interface Column {
  field: string
  header: string
}


interface Sistema {
  id: string
  name: string
}
@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TreeTableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  providers: [NodeService],
  // providers: [SystemService, AccessService],
})
export class UsuarioFormComponent implements OnInit {
  @ViewChild('tt') tt!: TreeTable

  // Sistemas disponibles
  sistemas: Sistema[] = [
    { id: 'ERP', name: 'Sistema ERP' },
    { id: 'CRM', name: 'Sistema CRM' },
    { id: 'BI', name: 'Sistema BI' },
  ]

  selectedSistemas: Sistema[] = []
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

  ngOnInit(): void {
    this.loadPermissionData()
  }

  private async loadPermissionData(): Promise<void> {
    try {
      this.permissionData = await this.nodeService.getTreeTableNodes()
      this.filteredData = []
    } catch (error) {
      console.error('Error loading permission data:', error)
      this.permissionData = []
      this.filteredData = []
    }
  }

  filterBySistemas(): void {
    if (!this.selectedSistemas?.length) {
      this.filteredData = []
      return
    }

    const sistemasIds = this.selectedSistemas.map((s) => s.id)
    this.filteredData = this.deepFilter(this.permissionData, sistemasIds)
  }

  private deepFilter(nodes: TreeNode[], sistemasIds: string[]): TreeNode[] {
    return nodes
      .map((node) => ({ ...node })) // Clone node
      .filter((node) => {
        const hasValidChildren = node.children?.some((child) =>
          sistemasIds.includes(child.data.sistema),
        )
        return sistemasIds.includes(node.data.sistema) || hasValidChildren
      })
      .map((node) => {
        if (node.children) {
          node.children = this.deepFilter(node.children, sistemasIds)
        }
        return node
      })
  }

  onGlobalSearch(event: Event): void {
    const input = event.target as HTMLInputElement
    if (this.tt) {
      this.tt.filterGlobal(input.value, 'contains')
    }
  }

}