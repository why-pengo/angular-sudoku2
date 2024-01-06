import { AfterViewChecked, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from '../cell/cell.component';
import { CellDemoComponent } from '../cell-demo/cell-demo.component';
import { UtilsService } from '../services/utils.service';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent, CellDemoComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent implements AfterViewChecked {
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  rowsCount = Array.from(Array(this.rows.length).keys())
    .map((x) => x + 1)
    .map(String);
  private gameState = inject(GameStateService);
  private utils = inject(UtilsService);

  ngAfterViewChecked(): void {
    // this.utils.toggleVisibilityOfGrids();
  }

  onCellClick($event: MouseEvent) {
    const cellId = this.utils.getCellIdFromClickEventTarget(
      $event.target as HTMLElement,
    );
    if (this.gameState.wasGuess) {
      this.utils.update_puzzle(cellId);
    } else {
      if (this.utils.getCellById(cellId)) {
        if (this.gameState.curHlCellId !== '0') {
          this.utils.unHighlightRowAndColumn(this.gameState.curHlCellId);
          this.utils.unHighlightSquareByValue(this.gameState.curHlCellId);
          this.utils.setGridDarkBg(true);
        }
        this.utils.highlightRowAndColumn(cellId);
        this.utils.highlightSquareByValue(cellId);
      }
    }
  }
}
