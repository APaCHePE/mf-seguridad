import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabView } from 'primeng/tabview';
import { TabPanel } from 'primeng/tabview';
import { NgComponentOutlet, CommonModule } from '@angular/common';
import { TabViewChangeEvent } from 'primeng/tabview'; // ✅ importa esto

export interface Tab {
  header: string;
  content: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-tab-view-container',
  templateUrl: './tab-view-container.component.html',
  imports: [TabView, TabPanel, NgComponentOutlet, CommonModule],
  styleUrls: ['./tab-view-container.component.scss']
})
export class TabViewContainerComponent {
  /**
   * Pestañas a mostrar
   */
  @Input() tabs: Tab[] = [];

  /**
   * Índice de la pestaña activa
   */
  @Input() activeIndex: number = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  /**
   * Clases CSS adicionales para el contenedor
   */
  @Input() styleClass: string = '';

  /**
   * Maneja el cambio de pestaña
   */
  onTabChange(event: TabViewChangeEvent): void {
    this.activeIndex = event.index;
    this.activeIndexChange.emit(event.index);
  }

}