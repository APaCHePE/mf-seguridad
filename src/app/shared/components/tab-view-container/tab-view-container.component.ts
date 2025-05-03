import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgComponentOutlet, CommonModule } from '@angular/common';
import { TabViewChangeEvent } from 'primeng/tabview'; // ✅ importa esto
import { TabsModule } from 'primeng/tabs';

export interface Tab {
  header: string;
  content: any;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-tab-view-container',
  templateUrl: './tab-view-container.component.html',
  imports: [
    TabsModule,
    NgComponentOutlet, 
    CommonModule
  ],
  styleUrls: ['./tab-view-container.component.scss']
})
export class TabViewContainerComponent {
  @Input() tabs: Tab[] = [];
  @Input() styleClass: string = '';
  @Input() activeIndex: number = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  /**
   * Maneja el cambio de pestaña
   */
  onTabChange(event: TabViewChangeEvent): void {
    this.activeIndex = event.index;
    this.activeIndexChange.emit(event.index);
  }

}