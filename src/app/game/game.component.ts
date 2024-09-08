import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../services/utils.service';
import { GameStateService } from '../services/game-state.service';
import { BoardComponent } from '../board/board.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Cell } from '../services/cell';

declare let bootstrap: any;

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, BoardComponent, RouterLink, RouterLinkActive],
  templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit, OnInit {
  private utils = inject(UtilsService);
  private gameState = inject(GameStateService);

  ngAfterViewInit(): void {
    // load defaults
    // console.log('sudoku', this.gameState.sudoku);
    // console.log('cells', this.gameState.cells);
    this.utils.initializeBoard();
    this.utils.setGridBg(true);
    if (this.gameState.savedGame) {
      for (const i in this.gameState.cells) {
        const cell: Cell = this.gameState.cells[i];
        this.utils.updateCell(cell);
      }
    }
  }

  ngOnInit(): void {
    // Bootstrap tooltip initialization
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
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
    if (penClicked === 'save') {
      this.gameState.saveGameState();
    }
    if (penClicked === 'delete') {
      this.gameState.deleteGameState();
    }
  }

  onModeClick($event: MouseEvent) {
    console.log('event', $event);
    this.utils.changeColorMode();
    console.log('colorMode', this.gameState.colorMode);
    this.utils.setGridBg(true);
  }
}
