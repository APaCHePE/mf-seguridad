import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sistema } from '../../../../../services/api/models/sistema.model';
import { InputSwitch } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-sistema-form',
  templateUrl: './sistema-form.component.html',
  styleUrls: ['./sistema-form.component.scss'],
  imports: [
    InputSwitch,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ]
})
export class SistemaFormComponent {
  @Input() sistema?: Sistema;
  @Input() disabledFields: string[] = [];
  @Output() submitForm = new EventEmitter<Sistema>();
  @Output() cancel = new EventEmitter<void>();

  sistemaForm: FormGroup;

  // Opciones de iconos disponibles
  iconOptions = [
    { label: 'Caja', value: 'pi-box' },
    { label: 'Usuarios', value: 'pi-users' },
    { label: 'Configuración', value: 'pi-cog' },
    { label: 'Seguridad', value: 'pi-shield' },
    { label: 'Comercio', value: 'pi-shopping-cart' },
    { label: 'Dinero', value: 'pi-money-bill' }
  ];

  constructor(private fb: FormBuilder) {
    this.sistemaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      codigo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[A-Z_]+$/)]],
      icono: ['pi-box'],
      activo: [true]
    });
  }

  ngOnChanges(): void {
    if (this.sistema) {
      this.sistemaForm.patchValue(this.sistema);
    }

    // Bloquear campos según disabledFields
    this.disabledFields.forEach(field => {
      const control = this.sistemaForm.get(field);
      if (control) {
        control.disable();
      }
    });
  }

  onSubmit(): void {
    if (this.sistemaForm.valid) {
      const formValue = this.sistemaForm.getRawValue(); // Incluye campos disabled
      this.submitForm.emit({
        ...this.sistema, // Mantenemos el ID si existe
        ...formValue
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}