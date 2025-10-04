import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cell',
    imports: [CommonModule],
    templateUrl: './cell.component.html'
})
export class CellComponent {
  @Input()
  Id: string | null = null;
}
