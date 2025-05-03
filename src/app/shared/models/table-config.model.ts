import { TemplateRef } from '@angular/core';

export type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined;
export type ColumnType = 'text' | 'icon' | 'tag' | 'status';

export interface TableColumn {
  field: string;                   // Campo del objeto a mostrar
  header: string;                  // Título de la columna
  type?: ColumnType;
  sortable?: boolean;              // Si es ordenable
  width?: string;                  // Ancho de columna (ej: '100px')
  align?: 'left' | 'center' | 'right'; // Alineación del contenido
  template?: TemplateRef<any>;     // Template personalizado
  styleClass?: string;             // Clases CSS adicionales
  hidden?: boolean;                // Si la columna está oculta
  dataLabel?: string;              // Para mobile, el label a mostrar

  iconPrefix?: string; // Para tipo 'icon' (ej: 'pi')
  tagTrueLabel?: string; // Para tipo 'tag'
  tagFalseLabel?: string;
  tagTrueSeverity?: TagSeverity;
  tagFalseSeverity?: TagSeverity;
}

export interface TableAction {
  name: string;                    // Identificador único de la acción
  icon: string;                    // Icono de PrimeIcons
  label?: string;                  // Texto alternativo
  severity?: TagSeverity;
  tooltip?: string;                // Texto para tooltip
  disabled?: boolean;              // Si la acción está deshabilitada
  visible?: (row: any) => boolean; // Función para determinar visibilidad
}

export interface TableConfig {
  paginator?: boolean;             // Mostrar paginador
  rows?: number;                   // Filas por página
  rowsPerPageOptions?: number[];   // Opciones de paginación
  selectionMode?: 'single' | 'multiple'; // Modo de selección
  globalFilterFields?: string[];   // Campos para búsqueda global
  scrollable?: boolean;            // Tabla scrollable
  scrollHeight?: string;           // Altura para scroll (ej: '400px')
  loading?: boolean;               // Estado de carga
  lazy?: boolean;                  // Carga perezosa
  totalRecords?: number;           // Total de registros (para lazy)
  columns: TableColumn[];          // Columnas de la tabla
  actions: TableAction[];          // Acciones por fila
  contextMenu?: TableAction[];     // Acciones en menú contextual
  exportable?: boolean;            // Habilitar exportación
  reorderableColumns?: boolean;    // Permitir reordenar columnas
  resizableColumns?: boolean;      // Permitir redimensionar columnas
  expandedRows?: boolean;          // Filas expandibles
  rowExpandMode?: 'single' | 'multiple'; // Modo de expansión
}

export interface TableLazyEvent {
  first?: number;                  // Primer registro
  rows?: number;                   // Número de filas
  sortField?: string;              // Campo de ordenación
  sortOrder?: number;              // Orden (1 asc, -1 desc)
  filters?: {[key: string]: any};  // Filtros
  globalFilter?: string | null;    // Filtro global
}