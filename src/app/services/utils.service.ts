import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { GameStateService } from './game-state.service';
import { Cell } from './cell';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private gameState = inject(GameStateService);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  toggleBorderBySelector(selector: string): void {
    const nodes = document.querySelectorAll(
      selector,
    ) as NodeListOf<HTMLElement>;
    nodes.forEach((node) => {
      if (node.classList.contains('border')) {
        this.renderer.removeClass(node, 'border');
        this.renderer.addClass(node, 'border-danger');
        this.renderer.addClass(node, 'rounded');
      } else {
        this.renderer.addClass(node, 'border');
        this.renderer.addClass(node, 'border-danger');
        this.renderer.addClass(node, 'rounded');
      }
    });
  }

  toggleVisibilityBySelector(selector: string): void {
    const nodes = document.querySelectorAll(
      selector,
    ) as NodeListOf<HTMLElement>;
    nodes.forEach((node) => {
      if (node.classList.contains('invisible')) {
        this.renderer.removeClass(node, 'invisible');
      } else {
        this.renderer.addClass(node, 'invisible');
      }
    });
  }

  toggleVisibilityOfGrids(): void {
    // toggle state
    const toggled = !this.gameState.checkedGrid();
    this.gameState.checkedGrid.set(toggled);
    this.setGridDarkBg(toggled);
    console.log('toggled', toggled);
  }

  setGridDarkBg(toggled: boolean) {
    const oddGrids = [
      ...this.gameState.grid1,
      ...this.gameState.grid3,
      ...this.gameState.grid5,
      ...this.gameState.grid7,
      ...this.gameState.grid9,
    ];
    oddGrids.forEach((id) => {
      const cellById = document.getElementById(id);
      if (cellById === null) {
        console.error('cellById', cellById, ' not found.');
        return;
      }
      if (toggled) {
        this.renderer.addClass(cellById, 'bg-dark');
        this.renderer.addClass(cellById, 'text-white');
      } else {
        this.renderer.removeClass(cellById, 'bg-dark');
        this.renderer.removeClass(cellById, 'text-white');
      }
    });
  }

  // TODO: https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators
  //  and try/catch for null ??
  toggleGuess(value: number, targetCellId: string) {
    const guess = document.querySelector(`#${targetCellId}GV${value}`);
    if (guess === null) {
      console.error('guess', guess, ' not found.');
      return;
    }
    if (guess.classList.contains('text-danger')) {
      this.renderer.removeClass(guess, 'text-danger');
    } else {
      this.renderer.addClass(guess, 'text-danger');
    }
  }

  initializeBoard() {
    for (const i in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[i];
      if (cell.puzzle === -1) continue;
      const el = this.getBoardCellValueById(cell.id);
      if (el === null) {
        console.error(`${cell.id} not found!`);
        return;
      }
      el.textContent = `${cell.puzzle}`;
    }
  }

  getCellById(cellId: string): Cell {
    const cell: Cell = this.gameState.cells.find((c) => c.id === cellId)!;
    console.log(`cell[${cellId}] = ${JSON.stringify(cell)}`);
    return cell;
  }

  getCellIdFromClickEventTarget(target: HTMLElement): string {
    let cellId: string;
    console.log(target);
    if (target.classList.contains('cell-coordinates')) {
      cellId = target.innerHTML.slice(0, 2);
    } else {
      cellId = target.id;
    }
    if (cellId.endsWith('CV')) {
      cellId = cellId.slice(0, 2);
    }
    console.log('cellId', cellId);
    return cellId;
  }

  getBoardCellValueById(cellId: string): Element | null {
    return document.querySelector(`#${cellId}CV`);
  }

  highlightSquareByValue(cellId: string) {
    console.log(`highlightSquareByValue cellId = ${cellId}`);
    const cellIn: Cell = this.getCellById(cellId);
    if (cellIn.choice === 0) return;
    for (const k in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[k];
      if (cellIn.choice === cell.choice) {
        const el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.addClass(el, 'cell-selected');
      }
    }
  }

  unHighlightSquareByValue(cellId: string) {
    console.log(`unHighlightSquareByValue cellId = ${cellId}`);
    const cellIn: Cell = this.getCellById(cellId);
    for (const k in this.gameState.cells) {
      const cell = this.gameState.cells[k];
      if (cellIn.choice === cell.choice) {
        const el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.removeClass(el, 'cell-selected');
      }
    }
  }

  highlightRowAndColumn(cellId: string) {
    const [row, column] = cellId.split('');
    console.log(`highlighting row = ${row}, column = ${column}`);
    if (cellId === this.gameState.curHlCellId) return;
    this.gameState.curHlCellId = cellId;

    for (const i in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[i];
      if (cell.id.endsWith(column)) {
        const col = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.removeClass(col, 'bg-dark'); // if it's there
        this.renderer.addClass(col, 'cell-selected');
      }
      if (cell.id.startsWith(row)) {
        const r = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.removeClass(r, 'bg-dark'); // if it's there
        this.renderer.addClass(r, 'cell-selected');
      }
    }
  }

  unHighlightRowAndColumn(cellId: string) {
    const [row, column] = cellId.split('');
    console.log(`unhighlighting row = ${row}, column = ${column}`);

    for (const i in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[i];
      if (cell.id.endsWith(column)) {
        const col = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.removeClass(col, 'cell-selected');
      }
      if (cell.id.startsWith(row)) {
        const r = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.removeClass(r, 'cell-selected');
      }
    }
  }

  setCellValue(cell: Cell) {
    const el = document.getElementById(cell.id) as HTMLElement;
    const ch = el.querySelector('.cell-value') as HTMLElement;
    ch.textContent = cell.choice.toString();
  }

  update_puzzle(cellId: string) {
    console.log(
      `cellId = ${cellId}, numberClicked = ${this.gameState.numberClicked}`,
    );
    const cell: Cell = this.getCellById(cellId);
    console.log(`cell = ${JSON.stringify(cell)}`);
    if (this.gameState.numberClicked !== cell.solution) {
      alert(`Error: incorrect.`);
    } else {
      cell.choice = this.gameState.numberClicked;
      console.log(`cell = ${JSON.stringify(cell)}`);
      this.setCellValue(cell);
    }
  }
}
