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
    this.setGridBg(toggled);
  }

  setGridBg(toggled: boolean) {
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
        if (this.gameState.colorMode === 'light') {
          this.renderer.removeClass(cellById, 'bg-light');
          this.renderer.removeClass(cellById, 'text-black');
          this.renderer.addClass(cellById, 'bg-dark');
          this.renderer.addClass(cellById, 'text-white');
        } else {
          this.renderer.removeClass(cellById, 'bg-dark');
          this.renderer.removeClass(cellById, 'text-white');
          this.renderer.addClass(cellById, 'bg-light');
          this.renderer.addClass(cellById, 'text-black');
        }
      } else {
        this.renderer.removeClass(cellById, 'bg-dark');
        this.renderer.removeClass(cellById, 'text-white');
        this.renderer.removeClass(cellById, 'bg-light');
        this.renderer.removeClass(cellById, 'text-black');
      }
    });
  }

  changeColorMode() {
    const html = document.querySelector('html') as HTMLElement;
    if (this.gameState.colorMode === 'light') {
      this.gameState.colorMode = 'dark';
      this.renderer.setAttribute(html, 'data-bs-theme', 'dark');
    } else {
      this.gameState.colorMode = 'light';
      this.renderer.setAttribute(html, 'data-bs-theme', 'light');
    }
  }

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

  areNotEqual(a: number[], b: number[]): boolean {
    return !(JSON.stringify(a) === JSON.stringify(b));
  }

  clearGuess(cellId: string, guess: number) {
    const [row, column] = cellId.split('');
    for (const i in this.gameState.cells) {
      const cell: Cell = this.gameState.cells[i];
      // col
      if (cell.id.endsWith(column)) {
        const filtered = cell.guesses.filter((n) => n !== guess);
        if (this.areNotEqual(cell.guesses, filtered)) {
          cell.guesses = filtered;
          this.updateCell(cell);
        }
      }
      // row
      if (cell.id.startsWith(row)) {
        const filtered = cell.guesses.filter((n) => n !== guess);
        if (this.areNotEqual(cell.guesses, filtered)) {
          cell.guesses = filtered;
          this.updateCell(cell);
        }
      }
    }
    // find what grid cell is in
    const grid = this.findMatchingGrid(cellId);
    // clear that grid of guess
    grid.forEach((c) => {
      const cell = this.getCellById(c);
      const filtered = cell.guesses.filter((n) => n !== guess);
      if (this.areNotEqual(cell.guesses, filtered)) {
        cell.guesses = filtered;
        this.updateCell(cell);
      }
    });
  }

  findMatchingGrid(cellId: string): string[] {
    if (this.gameState.grid1.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid1;
    }
    if (this.gameState.grid2.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid2;
    }
    if (this.gameState.grid3.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid3;
    }
    if (this.gameState.grid4.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid4;
    }
    if (this.gameState.grid5.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid5;
    }
    if (this.gameState.grid6.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid6;
    }
    if (this.gameState.grid7.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid7;
    }
    if (this.gameState.grid8.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid8;
    }
    if (this.gameState.grid9.filter((c) => c === cellId).length > 0) {
      return this.gameState.grid9;
    }
    return [];
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
      this.clearGuess(cellId, this.gameState.numberClicked);
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
