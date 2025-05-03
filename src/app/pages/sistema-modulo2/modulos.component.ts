import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Sistema {
  id: number;
  nombre: string;
  codigo: string;
  icono: string;
  activo: boolean;
}

interface Modulo {
  id: number;
  nombre: string;
  ruta: string;
  icono: string;
  sistemaId: number;
  sistema?: Sistema;
  moduloPadreId?: number | null; 
  children?: Modulo[];
  activo: boolean;
}

@Component({
  selector: 'app-sistemas-modulos',
  templateUrl: './modulos.component.html',
  providers: [ConfirmationService, MessageService],
  imports:[
    TagModule,
    CommonModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    TreeTableModule,
    DropdownModule,
    InputSwitchModule,
    TreeSelectModule,
    TabViewModule,
    ToastModule,
    FormsModule, // importante para los formularios
    ReactiveFormsModule // importante para los formularios reactivos
  ],
})
export class ModulosComponent implements OnInit {
  // Sistemas
  systems: Sistema[] = [];
  filteredSystems: Sistema[] = [];
  systemFilter: string = '';
  systemDialogVisible: boolean = false;
  editingSystem: boolean = false;
  systemForm: FormGroup;

  // Módulos
  modules: Modulo[] = [];
  modulesTree: TreeNode[] = [];
  filteredModules: any[] = [];
  moduleFilter: string = '';
  moduleDialogVisible: boolean = false;
  editingModule: boolean = false;
  moduleForm: FormGroup;

  loading: boolean = false;
  iconOptions: any[] = [
    { label: 'Caja', value: 'pi-box' },
    { label: 'Usuarios', value: 'pi-users' },
    { label: 'Carpeta', value: 'pi-folder' },
    { label: 'Documento', value: 'pi-file' },
    { label: 'Configuración', value: 'pi-cog' },
    { label: 'Seguridad', value: 'pi-shield' },
    { label: 'Comercio', value: 'pi-shopping-cart' },
    { label: 'Dinero', value: 'pi-money-bill' }
  ];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.systemForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      icono: ['pi-box'],
      activo: [true]
    });

    this.moduleForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      ruta: ['', Validators.required],
      icono: ['pi-folder'],
      sistemaId: [null, Validators.required],
      moduloPadreId: [null],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    // Simular carga de datos
    setTimeout(() => {
      // Datos de ejemplo
      this.systems = [
        { id: 1, nombre: 'Comercialización', codigo: 'COMERCIAL', icono: 'pi-shopping-cart', activo: true },
        { id: 2, nombre: 'Seguridad', codigo: 'SEGURIDAD', icono: 'pi-shield', activo: true }
      ];

      this.modules = [
        { 
          id: 1, 
          nombre: 'Comercial', 
          ruta: '/comercial', 
          icono: 'pi-chart-bar', 
          sistemaId: 1, 
          moduloPadreId: null, 
          activo: true,
          sistema: this.systems[0]
        },
        { 
          id: 2, 
          nombre: 'Recaudación', 
          ruta: '/recaudacion', 
          icono: 'pi-money-bill', 
          sistemaId: 1, 
          moduloPadreId: null, 
          activo: true,
          sistema: this.systems[0]
        },
        { 
          id: 3, 
          nombre: 'Administración de Sistema', 
          ruta: '/admin-sistema', 
          icono: 'pi-cog', 
          sistemaId: 2, 
          moduloPadreId: null, 
          activo: true,
          sistema: this.systems[1]
        },
        { 
          id: 4, 
          nombre: 'Gestión de Usuarios', 
          ruta: '/gestion-usuarios', 
          icono: 'pi-users', 
          sistemaId: 2, 
          moduloPadreId: null, 
          activo: true,
          sistema: this.systems[1]
        }
      ];

      this.buildModulesTree();
      this.filteredSystems = [...this.systems];
      this.filteredModules = this.mapModulesToTreeNodes(this.modules);
      this.loading = false;
    }, 1000);
  }

  buildModulesTree(): void {
    const modulesWithChildren = this.modules.map(module => ({
      ...module,
      children: this.modules.filter(m => m.moduloPadreId === module.id)
    }));

    this.modulesTree = modulesWithChildren
      .filter(module => !module.moduloPadreId)
      .map(module => this.mapModuleToTreeNode(module));
  }

  mapModuleToTreeNode(module: Modulo): TreeNode {
    return {
      key: module.id.toString(),
      label: module.nombre,
      data: module,
      children: module.children?.map(child => this.mapModuleToTreeNode(child))
    };
  }

  mapModulesToTreeNodes(modules: Modulo[]): any[] {
    return modules.map(module => ({
      ...module,
      children: modules.filter(m => m.moduloPadreId === module.id).length > 0 
        ? this.mapModulesToTreeNodes(modules.filter(m => m.moduloPadreId === module.id)) 
        : undefined
    }));
  }

  // Métodos para Sistemas
  filterSystems(): void {
    if (!this.systemFilter) {
      this.filteredSystems = [...this.systems];
      return;
    }
    
    this.filteredSystems = this.systems.filter(system => 
      system.nombre.toLowerCase().includes(this.systemFilter.toLowerCase()) ||
      system.codigo.toLowerCase().includes(this.systemFilter.toLowerCase())
    );
  }

  showNewSystemDialog(): void {
    this.systemForm.reset({
      icono: 'pi-box',
      activo: true
    });
    this.editingSystem = false;
    this.systemDialogVisible = true;
  }

  editSystem(system: Sistema): void {
    this.systemForm.patchValue(system);
    this.editingSystem = true;
    this.systemDialogVisible = true;
  }

  hideSystemDialog(): void {
    this.systemDialogVisible = false;
    this.systemForm.reset();
  }

  saveSystem(): void {
    if (this.systemForm.invalid) return;

    const systemData = this.systemForm.value;

    if (this.editingSystem) {
      // Actualizar sistema
      const index = this.systems.findIndex(s => s.id === systemData.id);
      if (index !== -1) {
        this.systems[index] = systemData;
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Sistema actualizado correctamente'
      });
    } else {
      // Crear nuevo sistema
      systemData.id = Math.max(...this.systems.map(s => s.id), 0) + 1;
      this.systems.push(systemData);
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Sistema creado correctamente'
      });
    }

    this.filteredSystems = [...this.systems];
    this.systemDialogVisible = false;
    this.systemForm.reset();
  }

  toggleSystemStatus(system: Sistema): void {
    system.activo = !system.activo;
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Sistema ${system.activo ? 'activado' : 'desactivado'} correctamente`
    });
  }

  confirmDeleteSystem(system: Sistema): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el sistema "${system.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSystem(system);
      }
    });
  }

  deleteSystem(system: Sistema): void {
    this.systems = this.systems.filter(s => s.id !== system.id);
    this.filteredSystems = this.filteredSystems.filter(s => s.id !== system.id);
    
    // También eliminar módulos asociados
    this.modules = this.modules.filter(m => m.sistemaId !== system.id);
    this.buildModulesTree();
    
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Sistema eliminado correctamente'
    });
  }

  // Métodos para Módulos
  filterModules(): void {
    if (!this.moduleFilter) {
      this.filteredModules = this.mapModulesToTreeNodes(this.modules);
      return;
    }
    
    const filtered = this.modules.filter(module => 
      module.nombre.toLowerCase().includes(this.moduleFilter.toLowerCase()) ||
      module.ruta.toLowerCase().includes(this.moduleFilter.toLowerCase()) ||
      module.sistema?.nombre.toLowerCase().includes(this.moduleFilter.toLowerCase())
    );
    
    this.filteredModules = this.mapModulesToTreeNodes(filtered);
  }

  showNewModuleDialog(): void {
    this.moduleForm.reset({
      icono: 'pi-folder',
      activo: true
    });
    this.editingModule = false;
    this.moduleDialogVisible = true;
  }

  editModule(module: Modulo): void {
    this.moduleForm.patchValue(module);
    this.editingModule = true;
    this.moduleDialogVisible = true;
  }

  hideModuleDialog(): void {
    this.moduleDialogVisible = false;
    this.moduleForm.reset();
  }

  saveModule(): void {
    if (this.moduleForm.invalid) return;

    const moduleData = this.moduleForm.value;

    if (this.editingModule) {
      // Actualizar módulo
      const index = this.modules.findIndex(m => m.id === moduleData.id);
      if (index !== -1) {
        this.modules[index] = {
          ...this.modules[index],
          ...moduleData,
          sistema: this.systems.find(s => s.id === moduleData.sistemaId)
        };
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Módulo actualizado correctamente'
      });
    } else {
      // Crear nuevo módulo
      moduleData.id = Math.max(...this.modules.map(m => m.id), 0) + 1;
      moduleData.sistema = this.systems.find(s => s.id === moduleData.sistemaId);
      this.modules.push(moduleData);
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Módulo creado correctamente'
      });
    }

    this.buildModulesTree();
    this.filteredModules = this.mapModulesToTreeNodes(this.modules);
    this.moduleDialogVisible = false;
    this.moduleForm.reset();
  }

  toggleModuleStatus(module: Modulo): void {
    module.activo = !module.activo;
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Módulo ${module.activo ? 'activado' : 'desactivado'} correctamente`
    });
  }

  confirmDeleteModule(module: Modulo): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el módulo "${module.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteModule(module);
      }
    });
  }

  deleteModule(module: Modulo): void {
    // Primero eliminar módulos hijos
    this.modules = this.modules.filter(m => m.moduloPadreId !== module.id);
    // Luego eliminar el módulo
    this.modules = this.modules.filter(m => m.id !== module.id);
    
    this.buildModulesTree();
    this.filteredModules = this.mapModulesToTreeNodes(this.modules);
    
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Módulo eliminado correctamente'
    });
  }
}