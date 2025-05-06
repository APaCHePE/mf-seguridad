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


import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { SISTEMAS_MOCK } from '../../../../services/api/mocks/sistemas.mock';

@Injectable()
export class NodeService {
  private getSystemData(id: number) {
    const system = SISTEMAS_MOCK.find((s) => s.id === id)
    return {
      nombre: system?.nombre || `Sistema ${id}`,
      icono: system?.icono || 'pi-question-circle',
    }
  }

  getPermissionTreeData(): TreeNode[] {
    return [
      {
        key: '1-0',
        data: {
          name: 'Reclamos',
          idSistema: 1,
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre,
          icono: this.getSystemData(1).icono,
        },
        children: [
          {
            key: '1-0-0',
            data: {
              name: 'Reclamos portal web',
              idSistema: 1,
              type: 'Submódulo',
              sistema: this.getSystemData(1).nombre,
              icono: this.getSystemData(1).icono,
            },
            children: [
              {
                key: '1-0-0-0',
                data: {
                  name: 'Reclamos comerciales de facturación',
                  idSistema: 1,
                  type: 'Opción',
                  sistema: this.getSystemData(1).nombre,
                  icono: this.getSystemData(1).icono,
                },
              },
              {
                key: '1-0-0-1',
                data: {
                  name: 'Solicitud de problemas sin facturación',
                  idSistema: 1,
                  type: 'Opción',
                  sistema: this.getSystemData(1).nombre,
                  icono: this.getSystemData(1).icono,
                },
              },
              {
                key: '1-0-0-2',
                data: {
                  name: 'Solicitud de problemas operacionales',
                  idSistema: 1,
                  type: 'Opción',
                  sistema: this.getSystemData(1).nombre,
                  icono: this.getSystemData(1).icono,
                },
              },
              {
                key: '1-0-0-3',
                data: {
                  name: 'Solicitud de alcance general',
                  idSistema: 1,
                  type: 'Opción',
                  sistema: this.getSystemData(1).nombre,
                  icono: this.getSystemData(1).icono,
                },
              },
            ],
          },
        ],
      },
      {
        key: '2-0',
        data: {
          name: 'Consultas',
          idSistema: 1,
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre,
          icono: this.getSystemData(1).icono,
        },
        children: [],
      },
      {
        key: '3-0',
        data: {
          name: 'Administración',
          idSistema: 1,
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre,
          icono: this.getSystemData(1).icono,
        },
        children: [],
      },
      {
        key: '4-0',
        data: {
          name: 'Catastro',
          idSistema: 1,
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre,
          icono: this.getSystemData(1).icono,
        },
        children: [],
      },
      {
        key: '5-0',
        data: {
          name: 'Facturación',
          idSistema: 1, // Reemplaza con el ID del sistema correspondiente
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre, // Asegúrate de que esto funcione correctamente
          icono: this.getSystemData(1).icono, // Asegúrate de que esto funcione correctamente
        },
        children: [],
      },
      {
        key: '6-0',
        data: {
          name: 'Medición',
          idSistema: 1, // Reemplaza con el ID del sistema correspondiente
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre, // Asegúrate de que esto funcione correctamente
          icono: this.getSystemData(1).icono, // Asegúrate de que esto funcione correctamente
        },
        children: [],
      },
      {
        key: '7-0',
        data: {
          name: 'Cobranza',
          idSistema: 1, // Reemplaza con el ID del sistema correspondiente
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre, // Asegúrate de que esto funcione correctamente
          icono: this.getSystemData(1).icono, // Asegúrate de que esto funcione correctamente
        },
        children: [],
      },
      {
        key: '8-0',
        data: {
          name: 'Recaudación',
          idSistema: 1, // Reemplaza con el ID del sistema correspondiente
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre, // Asegúrate de que esto funcione correctamente
          icono: this.getSystemData(1).icono, // Asegúrate de que esto funcione correctamente
        },
        children: [],
      },
      {
        key: '9-0',
        data: {
          name: 'Indicadores',
          idSistema: 1, // Reemplaza con el ID del sistema correspondiente
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre, // Asegúrate de que esto funcione correctamente
          icono: this.getSystemData(1).icono, // Asegúrate de que esto funcione correctamente
        },
        children: [],
      },
      {
        key: '10-0',
        data: {
          name: 'Reportes',
          idSistema: 1, // Reemplaza con el ID del sistema correspondiente
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre, // Asegúrate de que esto funcione correctamente
          icono: this.getSystemData(1).icono, // Asegúrate de que esto funcione correctamente
        },
        children: [],
      },
      {
        key: '11-0',
        data: {
          name: 'GisVma',
          idSistema: 1, // Reemplaza con el ID del sistema correspondiente.
          type: 'Módulo',
          sistema: this.getSystemData(1).nombre, // Asegúrate de que esto funcione correctamente.
          icono: this.getSystemData(1).icono, // Asegúrate de que esto funcione correctamente.
        },
        children: [],
      },
      {
        key: '12-0',
        data: {
          name: 'Mantenimiento',
          idSistema: 2,
          type: 'Módulo',
          sistema: this.getSystemData(2).nombre,
          icono: this.getSystemData(2).icono,
        },
        children: [
          {
            key: '2-0-0',
            data: {
              name: 'Administración',
              idSistema: 2,
              type: 'Submódulo',
              sistema: this.getSystemData(2).nombre,
              icono: this.getSystemData(2).icono,
            },
            children: [
              {
                key: '2-0-0-0',
                data: {
                  name: 'Asignar roles',
                  idSistema: 2,
                  type: 'Opción',
                  sistema: this.getSystemData(2).nombre,
                  icono: this.getSystemData(2).icono,
                },
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