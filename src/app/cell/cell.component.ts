import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-cell',
    imports: [],
    templateUrl: './cell.component.html'
})
export class CellComponent {
  @Input()
  Id: string | null = null;
}
