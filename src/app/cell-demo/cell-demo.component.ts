import { AfterViewInit, Component, inject } from '@angular/core';

import { UtilsService } from '../services/utils.service';
import { GameStateService } from '../services/game-state.service';
import { BoardComponent } from '../board/board.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-cell-demo',
    imports: [BoardComponent, RouterLink, RouterLinkActive],
    templateUrl: './cell-demo.component.html'
})
export class CellDemoComponent implements AfterViewInit {
  private utils = inject(UtilsService);
  private gameState = inject(GameStateService);

  toggleBorder(selector: string) {
    this.utils.toggleBorderBySelector(selector);
  }

  toggleVisibility(selector: string) {
    this.utils.toggleVisibilityBySelector(selector);
  }

  toggleVisibilityOfGrids() {
    this.utils.toggleVisibilityOfGrids();
  }

  toggleGuess(value: number, targetCellId: string) {
    this.utils.toggleGuess(value, targetCellId);
  }

  ngAfterViewInit(): void {
    // load defaults
    console.log('sudoku', this.gameState.sudoku);
    console.log('cells', this.gameState.cells);
    this.utils.initializeBoard();
    this.utils.toggleVisibilityOfGrids();
  }
}
