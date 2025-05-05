import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { Tag } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'

import { TableConfig, TableAction, TagSeverity } from '../../models/table-config.model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  imports: [
    TableModule,
    Tooltip,
    Tag,
    ButtonModule,
    NgClass,
    NgIf,
    NgFor,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
})
export class DynamicTableComponent {
  @Input() config!: TableConfig
  @Input() data: any[] = []
  @Input() loading: boolean = false
  @Output() action = new EventEmitter<{ action: string; data: any }>()

  hoveredRowIndex: number | null = null

  defaultConfig: Partial<TableConfig> = {
    paginator: true,
    rows: 10,
    rowsPerPageOptions: [5, 10, 25],
  }

  get mergedConfig(): TableConfig {
    return {
      paginator: true,
      rows: 10,
      rowsPerPageOptions: [5, 10, 25],
      ...this.config,
    }
  }

  showRowActions(index: number) {
    this.hoveredRowIndex = index
  }

  hideRowActions() {
    this.hoveredRowIndex = null
  }

  onActionClick(event: Event, actionName: string, rowData: any) {
    event.stopPropagation()
    this.action.emit({ action: actionName, data: rowData })
  }

  getSafeSeverity(value: boolean, col: any): TagSeverity {
    if (!col) return undefined

    const severity = value ? col.tagTrueSeverity : col.tagFalseSeverity

    // Mapeo de valores para asegurar compatibilidad
    switch (severity) {
      case 'warning':
        return 'warn' // Convertimos 'warning' a 'warn'
      case 'primary':
        return undefined // PrimeNG no soporta 'primary' en tags
      default:
        return severity as TagSeverity
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}