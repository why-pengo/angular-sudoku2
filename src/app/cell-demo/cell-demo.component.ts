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

  toggleBorder(event: Event, selector: string) {
    this.utils.toggleBorderBySelector(event, selector);
  }

  toggleVisibility(event: Event, selector: string) {
    this.utils.toggleVisibilityBySelector(event, selector);
  }

  toggleVisibilityOfGrids() {
    this.utils.toggleVisibilityOfGrids();
  }
}
