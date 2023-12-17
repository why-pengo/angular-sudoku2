import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
})
export class CellComponent {
  @Input()
  Id: string | null = null;

  onCellClick($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    console.log(target.id);
    const col = target.id.slice(0, 1);
    const row = target.id.slice(1, 2);
    console.log(col, row);
  }
}
