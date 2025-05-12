import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { CardModule } from 'primeng/card'
import { FormPerfilComponent } from './form-perfil/form-perfil.component'
import { FormAccesoComponent } from './form-acceso/form-acceso.component'

@Component({
  selector: 'app-usuario-form-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    CardModule,
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // AccordionModule,
    // TreeTableModule,
    // IconFieldModule,
    // InputIconModule,
    // InputTextModule,
    // MultiSelectModule,
    // SelectModule,
    // DropdownModule,
    // CheckboxModule,
    // ButtonModule,
    // CardModule,
    FormPerfilComponent,
    FormAccesoComponent,
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
  // styleUrls: ['./usuario-form.component.scss'],
  // providers: [NodeService],
  // providers: [SystemService, AccessService],
})
export class UsuarioFormEditComponent {}
