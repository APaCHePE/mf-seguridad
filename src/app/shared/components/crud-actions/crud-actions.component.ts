// crud-actions.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crud-actions',
  templateUrl: './crud-actions.component.html'
})
export class CrudActionsComponent {
  @Input() showNew: boolean = true;
  @Input() showSearch: boolean = true;
  @Output() new = new EventEmitter();
  @Output() search = new EventEmitter<string>();
}