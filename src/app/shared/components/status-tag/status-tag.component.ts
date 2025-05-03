import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-status-tag',
  template: `<p-tag
    [value]="value ? trueLabel : falseLabel"
    [severity]="value ? trueSeverity : falseSeverity"
    [icon]="showIcon ? icon : ''"
    [rounded]="true"
  >
  </p-tag>`,
  imports: [TagModule],
  styleUrls: ['./status-tag.component.scss'],
})
export class StatusTagComponent {
  @Input() value: boolean = false;
  @Input() trueLabel: string = 'Activo';
  @Input() falseLabel: string = 'Inactivo';

  @Input() trueSeverity:
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'secondary'
    | 'contrast' = 'success';
  @Input() falseSeverity:
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'secondary'
    | 'contrast' = 'danger';

  @Input() icon: string = '';
  @Input() showIcon: boolean = true;
}
