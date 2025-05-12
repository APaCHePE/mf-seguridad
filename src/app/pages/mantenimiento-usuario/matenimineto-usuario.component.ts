import { Component } from '@angular/core'
import { TableConfig } from '../../shared/models/table-config.model'
import { TabViewContainerComponent } from '../../shared/components/tab-view-container/tab-view-container.component'
import { UsuarioListComponent } from './usuario-list/usuario-list.component'
import { UsuarioFormComponent } from './usuario-form/usuario-form.component'

interface Tab {
  header: string
  content: any
  disabled?: boolean
}

@Component({
  selector: 'app-sistema-modulo',
  imports: [UsuarioListComponent],
  template: ` <app-usuario-list styleClass="mt-4"> </app-usuario-list> `,
})
export class SistemaModuloComponent {
}
