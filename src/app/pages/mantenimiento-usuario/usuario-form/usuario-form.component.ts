import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { TreeTable, TreeTableModule } from 'primeng/treetable'
import { TreeNode } from 'primeng/api'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox'
import { ButtonModule } from 'primeng/button'
import { SelectModule } from 'primeng/select'
import { CardModule } from 'primeng/card'
import { NodeService } from './perfil-data'
import { SistemaService } from '../../../../services/api/sistema.service'
import { Sistema } from '../../../../services/api/models/sistema.model'

interface Column {
  field: string
  header: string
}

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TreeTableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  providers: [NodeService],
  // providers: [SystemService, AccessService],
})
export class UsuarioFormComponent {
}