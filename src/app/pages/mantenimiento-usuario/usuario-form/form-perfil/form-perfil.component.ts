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
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-form-perfil',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './form-perfil.component.html',
  styleUrl: './form-perfil.component.scss',
})
export class FormPerfilComponent implements OnInit {
  fb = inject(FormBuilder)

  // Form groups
  formUsuario!: FormGroup
  formPermisos!: FormGroup

  // Opciones simuladas
  tiposDocumento = [
    { label: 'DNI', value: 'DNI' },
    { label: 'Carnet de Extranjería', value: 'CE' },
  ]

  sedes = [
    { label: 'Lima', value: 'Lima' },
    { label: 'Arequipa', value: 'Arequipa' },
  ]

  provincias = [
    { label: 'Lima', value: 'Lima' },
    { label: 'Cusco', value: 'Cusco' },
  ]

  sistemas = [
    { label: 'Sistema A', value: 'A' },
    { label: 'Sistema B', value: 'B' },
  ]

  modulos = [
    { label: 'Módulo 1', value: 'M1', sistema: 'A' },
    { label: 'Módulo 2', value: 'M2', sistema: 'A' },
    { label: 'Módulo 3', value: 'M3', sistema: 'B' },
    { label: 'Módulo 4', value: 'M4', sistema: 'B' },
  ]

  modulosFiltrados = signal(this.modulos)

  ngOnInit(): void {
    this.initForms()

    // Actualiza módulos filtrados cuando cambian los sistemas seleccionados
    effect(() => {
      const sistemasSeleccionados =
        this.formPermisos.get('sistemas')?.value || []
      const nuevosModulos = this.modulos.filter((mod) =>
        sistemasSeleccionados.includes(mod.sistema),
      )
      this.modulosFiltrados.set(nuevosModulos)
    })
  }

  private initForms(): void {
    this.formUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      tipoDocumento: [null, Validators.required],
      numeroDocumento: ['', Validators.required],
      sede: [null, Validators.required],
      provincia: [null, Validators.required],
      sistemaDefault: [null, Validators.required],
      moduloDefault: [null, Validators.required],
    })

    this.formPermisos = this.fb.group({
      sistemas: [[]],
      modulos: [[]],
    })
  }
}
