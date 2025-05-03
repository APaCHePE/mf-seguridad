import { Component } from '@angular/core';
import { TableConfig } from '../../shared/models/table-config.model';
import { TabViewContainerComponent } from '../../shared/components/tab-view-container/tab-view-container.component'
import { SistemaListComponent } from './sistema/sistema-list/sistema-list.component';
import { ModuloListComponent } from './modulo/modulo-list/modulo-list.component';

interface Tab {
  header: string;
  content: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-sistema-modulo',
  imports: [TabViewContainerComponent],
  template: `
    <app-tab-view-container
      [tabs]="tabs"
      [(activeIndex)]="activeIndex"
      styleClass="mt-4"
    >
    </app-tab-view-container>
  `,
})
export class SistemaModuloComponent {
  tabs: Tab[] = [
    { header: 'Sistemas', content: SistemaListComponent },
    { header: 'Módulos', content: ModuloListComponent }
  ];
  activeIndex: number = 0;
}
