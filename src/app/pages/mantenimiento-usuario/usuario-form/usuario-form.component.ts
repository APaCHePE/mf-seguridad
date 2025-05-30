import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { CardModule } from 'primeng/card'
import { FormPerfilComponent } from './form-perfil/form-perfil.component'
import { FormAccesoComponent } from './form-acceso/form-acceso.component'
import { StepperModule } from 'primeng/stepper'

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    CardModule,
    FormPerfilComponent,
    FormAccesoComponent,
    StepperModule,
  ],
  template: `<div class="flex justify-content-center">
    <p-accordion [multiple]="true" [activeIndex]="[0]">
      <p-accordionTab header="Crear Perfil">
        <app-form-perfil></app-form-perfil>
      </p-accordionTab>
      <p-accordionTab header="Asignar Accesos">
        <app-form-acceso></app-form-acceso>
      </p-accordionTab>
    </p-accordion>
  </div>`,
})
export class UsuarioFormComponent {}
