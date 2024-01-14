import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from '../cell/cell.component';
import { UtilsService } from '../services/utils.service';
import { GameStateService } from '../services/game-state.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent, RouterOutlet],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  rowsCount = Array.from(Array(this.rows.length).keys())
    .map((x) => x + 1)
    .map(String);
  private gameState = inject(GameStateService);
  private utils = inject(UtilsService);

  onCellClick($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    console.log('target', target);
    const cellId = this.utils.getCellIdFromClickEventTarget(
      $event.target as HTMLElement,
    );
    console.log('cellId', cellId);
    if (this.gameState.penMode) {
      this.utils.setChoice(cellId);
    } else {
      if (this.utils.getCellById(cellId)) {
        if (this.gameState.curHlCellId !== '0') {
          this.utils.unHighlightRowAndColumn(this.gameState.curHlCellId);
          this.utils.unHighlightSquareByValue(this.gameState.curHlCellId);
          this.utils.unHighlightSelectedCellValues(this.gameState.curHlCellId);
          this.utils.setGridDarkBg(true);
        }
        this.utils.highlightRowAndColumn(cellId);
        this.utils.highlightSquareByValue(cellId);
        this.utils.hightlightSelectedCellValues(cellId);
      }
      if (this.gameState.pencilMode) {
        this.utils.addGuess(cellId);
      }
    }
  }
}
