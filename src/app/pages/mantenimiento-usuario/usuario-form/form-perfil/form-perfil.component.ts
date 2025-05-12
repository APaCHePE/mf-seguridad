import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { MessageService } from 'primeng/api'
import { CheckboxModule } from 'primeng/checkbox'
import { SelectModule } from 'primeng/select'
import { TextareaModule } from 'primeng/textarea'
import { FluidModule } from 'primeng/fluid'
import { UsuarioService } from '../../../../../services/api/usuario.service'
import { SistemaService } from '../../../../../services/api/sistema.service'
import { Sistema } from '../../../../../services/api/models/sistema.model'
import { TIPOS_DOCUMENTO, SEDES, SISTEMAS } from '../perfil-data'

@Component({
  selector: 'app-form-perfil',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    SelectModule,
    MultiSelectModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    FormsModule,
    CheckboxModule,
    TextareaModule,
    FluidModule,
  ],
  templateUrl: './form-perfil.component.html',
  styleUrl: './form-perfil.component.scss',
})
export class FormPerfilComponent implements OnInit {
  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' },
  ]

  dropdownTipoDocumento = TIPOS_DOCUMENTO
  dropdownItemTipoDocumento = null

  dropdownSede = SEDES
  dropdownItemSede = null

  dropdownSistema = SISTEMAS
  dropdownItemSistema = null

  dropdownItem = null

  usuarioForm: FormGroup
  loading = false
  submitting = false

  // Opciones para formulario
  tiposDocumento = TIPOS_DOCUMENTO
  sistemas: Sistema[] = []
  selectedSistemas: Sistema[] = []

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private sistemaService: SistemaService,
    private messageService: MessageService,
  ) {
    this.usuarioForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        apellido: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        tipoDocumento: [null, Validators.required],
        numeroDocumento: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]*$/)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    )
  }

  ngOnInit(): void {
    this.loadSistemas()
  }

  loadSistemas(): void {
    this.loading = true
    this.sistemaService.getAll().subscribe({
      next: (sistemas) => {
        this.sistemas = sistemas
        this.loading = false
      },
      error: () => {
        this.loading = false
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los sistemas',
        })
      },
    })
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true }
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched()
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor complete todos los campos requeridos',
      })
      return
    }

    this.submitting = true
    const usuarioData = {
      ...this.usuarioForm.value,
      sistemas: this.selectedSistemas.map((s) => s.id),
      estado: 'A', // Por defecto activo
    }

    this.usuarioService.create(usuarioData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario creado correctamente',
        })
        this.usuarioForm.reset()
        this.selectedSistemas = []
        this.submitting = false
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al crear el usuario',
        })
        this.submitting = false
      },
    })
  }

  get f() {
    return this.usuarioForm.controls
  }

  formUsuario!: FormGroup
  formPermisos!: FormGroup

  provincias = [
    { label: 'Lima', value: 'Lima' },
    { label: 'Cusco', value: 'Cusco' },
  ]

  selectedSistema: any = null
  selectedSubsistema: any = null
  selectedModulo: any = null
  subsistemas: any[] = []
  modulos: any[] = []
  permisos: any[] = []
  loadingPermissions = false
  sedes = [
    { nombre: 'Sede Central', codigo: 'CENTRAL' },
    { nombre: 'Sede Norte', codigo: 'NORTE' },
    { nombre: 'Sede Sur', codigo: 'SUR' },
  ]

  onSistemaChange() {
    this.selectedSubsistema = null
    this.selectedModulo = null
    this.loadSubsistemas(this.selectedSistema?.id)
  }

  onSubsistemaChange() {
    this.selectedModulo = null
    this.loadModulos(this.selectedSubsistema?.id)
  }

  loadSubsistemas(sistemaId: number) {
    // Lógica para cargar subsistemas según sistema seleccionado
    this.subsistemas = [] // Reemplazar con llamada a servicio
  }

  loadModulos(subsistemaId: number) {
    // Lógica para cargar módulos según subsistema seleccionado
    this.modulos = [] // Reemplazar con llamada a servicio
    this.loadPermisos(subsistemaId)
  }

  loadPermisos(subsistemaId: number) {
    this.loadingPermissions = true
    // Lógica para cargar permisos según subsistema
    this.permisos = [] // Reemplazar con llamada a servicio
    this.loadingPermissions = false
  }
}
