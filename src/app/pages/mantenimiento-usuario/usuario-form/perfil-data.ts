export const ESTADOS = [
  { label: 'Activo', value: true },
  { label: 'Activo', value: true },
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
]

export const TIPOS_DOCUMENTO = [
  { label: 'DNI', value: 'dni' },
  { label: 'Carné de Extranjería', value: 'ce' },
  { label: 'Pasaporte', value: 'pasaporte' },
]

export const SEDES = [
  { label: 'Lima', value: 'lima' },
  { label: 'Arequipa', value: 'arequipa' },
  { label: 'Cusco', value: 'cusco' },
]

export const PROVINCIAS = [
  { label: 'Lima', value: 'lima' },
  { label: 'Callao', value: 'callao' },
  { label: 'Miraflores', value: 'miraflores' },
  { label: 'Miraflores', value: 'miraflores' },
  { label: 'Miraflores', value: 'miraflores' },
  { label: 'Miraflores', value: 'miraflores' },
  { label: 'Miraflores', value: 'miraflores' },
  { label: 'Miraflores', value: 'miraflores' },
]

export const SISTEMAS = [
  { label: 'Comercial', value: 'comercial' },
  { label: 'Seguridad', value: 'seguridad' },
]
import { Injectable } from '@angular/core'
import { TreeNode } from 'primeng/api'
import { delay, of } from 'rxjs'

@Injectable()
export class NodeService {
  getPermissionTreeData(): TreeNode[] {
    return [
      {
        key: 'ERP-0',
        data: { name: 'Finanzas', sistema: 'ERP', type: 'Módulo' },
        children: [
          {
            key: 'ERP-0-0',
            data: { name: 'Facturación', sistema: 'ERP', type: 'Submódulo' },
            children: [
              {
                key: 'ERP-0-0-0',
                data: {
                  name: 'Emitir factura',
                  sistema: 'ERP',
                  type: 'Opción',
                },
              },
              {
                key: 'ERP-0-0-1',
                data: {
                  name: 'Anular factura',
                  sistema: 'ERP',
                  type: 'Opción',
                },
              },
            ],
          },
          {
            key: 'ERP-0-1',
            data: { name: 'Contabilidad', sistema: 'ERP', type: 'Submódulo' },
            children: [
              {
                key: 'ERP-0-1-0',
                data: {
                  name: 'Registrar asiento',
                  sistema: 'ERP',
                  type: 'Opción',
                },
              },
            ],
          },
        ],
      },
      {
        key: 'CRM-0',
        data: { name: 'Clientes', sistema: 'CRM', type: 'Módulo' },
        children: [
          {
            key: 'CRM-0-0',
            data: { name: 'Gestión', sistema: 'CRM', type: 'Submódulo' },
            children: [
              {
                key: 'CRM-0-0-0',
                data: { name: 'Crear cliente', sistema: 'CRM', type: 'Opción' },
              },
            ],
          },
        ],
      },
      {
        key: 'BI-0',
        data: { name: 'Reportes', sistema: 'BI', type: 'Módulo' },
        children: [
          {
            key: 'BI-0-0',
            data: { name: 'Dashboards', sistema: 'BI', type: 'Submódulo' },
            children: [
              {
                key: 'BI-0-0-0',
                data: { name: 'Ver reportes', sistema: 'BI', type: 'Opción' },
              },
            ],
          },
        ],
      },
    ]
  }

  getTreeTableNodes(): Promise<TreeNode[]> {
    return Promise.resolve(this.getPermissionTreeData())
  }
}