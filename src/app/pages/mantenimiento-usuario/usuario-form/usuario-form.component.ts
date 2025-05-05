import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ConfirmationService, MessageService } from 'primeng/api'
import { TreeNode } from 'primeng/api'
import { Table, TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { TabViewChangeEvent } from 'primeng/tabview' // ✅ importa esto
import { TabsModule } from 'primeng/tabs'
import { FormsModule } from '@angular/forms'
import { NgClass, NgIf, NgFor } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { ReactiveFormsModule } from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { CheckboxModule } from 'primeng/checkbox'
import { NgComponentOutlet, CommonModule } from '@angular/common';
import {
  FilterBySystemPipe,
  FilterByModulePipe,
  FilterBySubmodulePipe,
  FilterByIdsPipe,
} from './filter-by.pipe'



@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  imports: [
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    TabsModule,
    NgClass,
    NgIf,
    DropdownModule,
    NgFor,
    FormsModule,
    AccordionModule,
    NgComponentOutlet,
    CommonModule,
    CheckboxModule,
    FilterBySystemPipe,
    FilterByModulePipe,
    FilterBySubmodulePipe,
    FilterByIdsPipe,
  ],
  providers: [ConfirmationService, MessageService],
})
export class UsuarioFormComponent {
  @Output() onSubmit = new EventEmitter<any>()
  @Output() onCancel = new EventEmitter<void>()

  // Datos mock
  documentTypes = ['DNI', 'Carné de Extranjería', 'Pasaporte', 'RUC']

  systems = [
    { id: 'seguridad', name: 'Sistema de Seguridad' },
    { id: 'comercial', name: 'Sistema Comercial' },
  ]

  modules = [
    { id: 'usuarios', name: 'Módulo de Usuarios', systemId: 'seguridad' },
    { id: 'roles', name: 'Módulo de Roles', systemId: 'seguridad' },
    { id: 'ventas', name: 'Módulo de Ventas', systemId: 'comercial' },
    { id: 'clientes', name: 'Módulo de Clientes', systemId: 'comercial' },
  ]

  submodules = [
    { id: 'sub1', name: 'Submódulo 1', moduleId: 'usuarios' },
    { id: 'sub2', name: 'Submódulo 2', moduleId: 'usuarios' },
    { id: 'sub3', name: 'Submódulo 3', moduleId: 'roles' },
    { id: 'sub4', name: 'Submódulo 4', moduleId: 'ventas' },
  ]

  options = [
    { id: 'opt1', name: 'Opción 1', submoduleId: 'sub1' },
    { id: 'opt2', name: 'Opción 2', submoduleId: 'sub1' },
    { id: 'opt3', name: 'Opción 3', submoduleId: 'sub2' },
    { id: 'opt4', name: 'Opción 4', submoduleId: 'sub3' },
  ]

  // Estado del formulario
  userForm: FormGroup
  selectedSystems: string[] = []
  selectedModules: any = {}
  selectedSubmodules: any = {}
  selectedOptions: any = {}

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      maternalLastName: [''],
      documentType: ['DNI', Validators.required],
      documentNumber: ['', Validators.required],
      sede: [''],
      provincia: [''],
    })
  }

  // Métodos para manejar selecciones
  toggleSystem(systemId: string) {
    const index = this.selectedSystems.indexOf(systemId)
    if (index === -1) {
      this.selectedSystems = [...this.selectedSystems, systemId] // Crear nuevo array
    } else {
      this.selectedSystems = this.selectedSystems.filter(
        (id) => id !== systemId,
      ) // Crear nuevo array
    }

    // Limpiar selecciones de módulos, submódulos y opciones cuando se deselecciona un sistema
    if (index !== -1) {
      this.modules
        .filter((m) => m.systemId === systemId)
        .forEach((m) => {
          delete this.selectedModules[m.id]
          this.submodules
            .filter((s) => s.moduleId === m.id)
            .forEach((s) => {
              delete this.selectedSubmodules[s.id]
              this.options
                .filter((o) => o.submoduleId === s.id)
                .forEach((o) => delete this.selectedOptions[o.id])
            })
        })
    }
  }

  toggleModule(moduleId: string) {
    this.selectedModules[moduleId] = !this.selectedModules[moduleId]
    if (!this.selectedModules[moduleId]) {
      // Deseleccionar submodulos y opciones
      this.submodules
        .filter((s) => s.moduleId === moduleId)
        .forEach((s) => {
          delete this.selectedSubmodules[s.id]
          this.options
            .filter((o) => o.submoduleId === s.id)
            .forEach((o) => delete this.selectedOptions[o.id])
        })
    }
  }

  toggleSubmodule(submoduleId: string) {
    this.selectedSubmodules[submoduleId] = !this.selectedSubmodules[submoduleId]

    if (this.selectedSubmodules[submoduleId]) {
      // Seleccionar todas las opciones del submodulo
      this.options
        .filter((o) => o.submoduleId === submoduleId)
        .forEach((o) => (this.selectedOptions[o.id] = true))
    } else {
      // Deseleccionar todas las opciones del submodulo
      this.options
        .filter((o) => o.submoduleId === submoduleId)
        .forEach((o) => delete this.selectedOptions[o.id])
    }
  }

  toggleOption(optionId: string, submoduleId: string) {
    this.selectedOptions[optionId] = !this.selectedOptions[optionId]

    // Verificar si todas las opciones del submodulo están seleccionadas
    const allOptionsSelected = this.options
      .filter((o) => o.submoduleId === submoduleId)
      .every((o) => this.selectedOptions[o.id])

    this.selectedSubmodules[submoduleId] = allOptionsSelected
  }

  submitForm() {
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.value,
        systems: this.selectedSystems,
        modules: this.selectedModules,
        submodules: this.selectedSubmodules,
        options: this.selectedOptions,
      }
      this.onSubmit.emit(formData)
    }
  }

  cancel() {
    this.onCancel.emit()
  }
  getSelectedModules(): string[] {
    return Object.keys(this.selectedModules).filter(
      (key) => this.selectedModules[key],
    )
  }

  getSelectedSubmodules(): string[] {
    return Object.keys(this.selectedSubmodules).filter(
      (key) => this.selectedSubmodules[key],
    )
  }
}
