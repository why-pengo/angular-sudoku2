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
      this.renderer.addClass(guess, 'invisible');
    } else {
      this.renderer.removeClass(guess, 'invisible');
      this.renderer.addClass(guess, 'text-danger');
    }
  }

  initializeBoard() {
    for (const i in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[i];
      // if (cell.puzzle === -1) continue; // blank
      if (cell.puzzle === 0) continue; // blank
      const el = this.getBoardCellValueById(cell.id);
      if (el === null) {
        console.error(`${cell.id} not found!`);
        return;
      }
      el.textContent = `${cell.puzzle}`;
    }
  }

  getCellById(cellId: string): Cell {
    return this.gameState.cells.find((c) => c.id === cellId)!;
  }

  getCellIdFromClickEventTarget(target: HTMLElement): string {
    return target.id?.slice(0, 2) ?? 'no id';
  }

  getBoardCellValueById(cellId: string): Element | null {
    return document.querySelector(`#${cellId}CV`);
  }

  getSelectedValue(cell: Cell): number {
    let selectedValue = 0;
    if (cell.choice !== 0) {
      selectedValue = cell.choice;
    }
    if (selectedValue === 0) {
      if (cell.puzzle !== -1) {
        selectedValue = cell.puzzle;
      }
    }
    return selectedValue;
  }

  hightlightSelectedCellValues(cellId: string) {
    const cellIn: Cell = this.getCellById(cellId);
    const selectedValue = this.getSelectedValue(cellIn);
    if (selectedValue === 0) return;
    for (const k in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[k];
      if (selectedValue === cell.choice || selectedValue === cell.puzzle) {
        const el = document.getElementById(
          cell.id.toString() + 'CV',
        ) as HTMLElement;
        this.renderer.addClass(el, 'cell-value-selected');
      }
    }
  }

  unHighlightSelectedCellValues(cellId: string) {
    const cellIn: Cell = this.getCellById(cellId);
    const selectedValue = this.getSelectedValue(cellIn);
    if (selectedValue === 0) return;
    for (const k in this.gameState.cells) {
      const cell = this.gameState.cells[k];
      if (selectedValue === cell.choice || selectedValue === cell.puzzle) {
        const el = document.getElementById(
          cell.id.toString() + 'CV',
        ) as HTMLElement;
        this.renderer.removeClass(el, 'cell-value-selected');
      }
    }
  }

  highlightSquareByValue(cellId: string) {
    const cellIn: Cell = this.getCellById(cellId);
    if (cellIn.choice === 0) return;
    for (const k in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[k];
      if (cellIn.choice === cell.choice) {
        const el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.addClass(el, 'cell-selected');
        this.renderer.removeClass(el, 'bg-dark');
        this.renderer.removeClass(el, 'text-white');
      }
      if (cell.guesses.includes(cellIn.choice)) {
        const selector = cell.id.toString() + 'GV' + cellIn.choice.toString();
        const el = document.getElementById(selector) as HTMLElement;
        this.renderer.addClass(el, 'cell-selected-guess');
      }
    }
  }

  unHighlightSquareByValue(cellId: string) {
    const cellIn: Cell = this.getCellById(cellId);
    for (const k in this.gameState.cells) {
      const cell = this.gameState.cells[k];
      if (cellIn.choice === cell.choice) {
        const el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.renderer.removeClass(el, 'cell-selected');
      }
      if (cell.guesses.includes(cellIn.choice)) {
        const selector = cell.id.toString() + 'GV' + cellIn.choice.toString();
        const el = document.getElementById(selector) as HTMLElement;
        this.renderer.removeClass(el, 'cell-selected-guess');
      }
    }
  }

  highlightRowAndColumn(cellId: string) {
    const [row, column] = cellId.split('');
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

  updateCell(cell: Cell) {
    const el = document.getElementById(cell.id) as HTMLElement;
    const ch = el.querySelector('.cell-value') as HTMLElement;
    if (cell.choice !== 0) {
      ch.textContent = cell.choice.toString();
    }
    if (cell.choice === cell.solution) {
      cell.guesses = [];
    }
    if (this.gameState.numberClicked === cell.puzzle) {
      return;
    }
    for (let i = 1; i <= 9; i++) {
      const gv = document.getElementById(`${cell.id}GV${i}`) as HTMLElement;
      if (cell.guesses.includes(i)) {
        this.renderer.removeClass(gv, 'invisible');
      } else {
        this.renderer.addClass(gv, 'invisible');
      }
    }
  }

  setChoice(cellId: string) {
    const cell: Cell = this.getCellById(cellId);
    if (this.gameState.numberClicked !== cell.solution) {
      alert(
        `Error: incorrect. ${this.gameState.numberClicked} !== ${cell.solution}`,
      );
    } else {
      cell.choice = this.gameState.numberClicked;
      this.updateCell(cell);
      // TODO: clear guesses for this choice that are on same row/col
      // what row to clear setChoice from gvs
      // what col to clear setChoice from gvs
      // what grid to clear setChoice from gvs
    }
  }

  addGuess(cellId: string) {
    const cell: Cell = this.getCellById(cellId);
    if (cell.choice) {
      return;
    }
    if (cell.guesses.includes(this.gameState.numberClicked)) {
      const index = cell.guesses.indexOf(this.gameState.numberClicked);
      if (index > -1) {
        cell.guesses.splice(index, 1);
      }
    } else {
      cell.guesses.push(this.gameState.numberClicked);
    }
    this.updateCell(cell);
  }
}
