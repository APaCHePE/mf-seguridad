import { Component } from '@angular/core'
import { StepperModule } from 'primeng/stepper'
import { ButtonModule } from 'primeng/button'
import { FormPerfilComponent } from './form-perfil/form-perfil.component'
import { FormAccesoComponent } from './form-acceso/form-acceso.component'

@Component({
  selector: 'app-usuario-form-new',
  standalone: true,
  imports: [
    ButtonModule,
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
    StepperModule,
  ],
  template: ` <div class="card">
    <p-stepper [value]="1" [linear]="true">
      <p-step-item [value]="1">
        <p-step>Perfil</p-step>
        <p-step-panel>
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <app-form-perfil></app-form-perfil>
              </div>
            </div>
            <div class="py-6">
              <p-button label="Next" (onClick)="activateCallback(2)" />
            </div>
          </ng-template>
        </p-step-panel>
      </p-step-item>

      <p-step-item [value]="2">
        <p-step>Accesos</p-step>
        <p-step-panel>
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                <app-form-acceso></app-form-acceso>
              </div>
            </div>
            <div class="flex py-6 gap-2">
              <p-button
                label="Back"
                severity="secondary"
                (onClick)="activateCallback(1)"
              />
              <p-button label="Next" (onClick)="activateCallback(1)" />
            </div>
          </ng-template>
        </p-step-panel>
      </p-step-item>
    </p-stepper>
  </div>`,
})
export class UsuarioFormNewComponent {}
