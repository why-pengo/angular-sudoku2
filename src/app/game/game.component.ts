import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../services/utils.service';
import { GameStateService } from '../services/game-state.service';
import { BoardComponent } from '../board/board.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, BoardComponent, RouterLink, RouterLinkActive],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {
  private utils = inject(UtilsService);
  private gameState = inject(GameStateService);

  toggleGuess(value: number, targetCellId: string) {
    this.utils.toggleGuess(value, targetCellId);
  }

  ngAfterViewInit(): void {
    // load defaults
    console.log('sudoku', this.gameState.sudoku);
    console.log('cells', this.gameState.cells);
    this.utils.initializeBoard();
    this.utils.setGridDarkBg(true);
  }
}
