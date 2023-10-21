import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CellComponent} from "../cell/cell.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './board.component.html'
})
export class BoardComponent {
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  rowsCount = Array.from(Array(this.rows.length).keys())
    .map((x) => x + 1)
    .map(String);

}
