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

  ngAfterViewInit(): void {
    // load defaults
    console.log('sudoku', this.gameState.sudoku);
    console.log('cells', this.gameState.cells);
    this.utils.initializeBoard();
    this.utils.setGridDarkBg(true);
  }

  onNumberClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const numberClicked = parseInt(target.id.charAt(target.id.length - 1));
    console.log(numberClicked);
    this.gameState.numberClicked = numberClicked;
  }

  onPenClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const penClicked = target.id;
    console.log(penClicked);
    if (penClicked === 'hand') {
      this.gameState.penMode = false;
      this.gameState.pencilMode = false;
    }
    if (penClicked === 'pen') {
      this.gameState.penMode = true;
      this.gameState.pencilMode = false;
    }
    if (penClicked === 'pencil') {
      this.gameState.penMode = false;
      this.gameState.pencilMode = true;
    }
  }
}
