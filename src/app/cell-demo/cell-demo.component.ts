import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-cell-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-demo.component.html',
})
export class CellDemoComponent {
  private utils = inject(UtilsService);

  toggleVis(event: Event, selector: string) {
    this.utils.toggleBorderBySelector(event, selector);
  }
}
