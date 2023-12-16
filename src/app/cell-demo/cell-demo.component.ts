import { AfterContentInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../services/utils.service';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-cell-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-demo.component.html',
})
export class CellDemoComponent implements AfterContentInit {
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

  ngAfterContentInit(): void {
    // load defaults
    this.utils.toggleVisibilityOfGrids();
    console.log('sudoku', this.gameState.sudoku);
  }
}
