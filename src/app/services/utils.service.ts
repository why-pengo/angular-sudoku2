import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private gameStateService = inject(GameStateService);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  toggleBorderBySelector(selector: string): void {
    let nodes = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
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
    let nodes = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    nodes.forEach((node) => {
      if (node.classList.contains('invisible')) {
        this.renderer.removeClass(node, 'invisible');
      } else {
        this.renderer.addClass(node, 'invisible');
      }
    });
  }

  toggleVisibilityOfGrids(): void {
    const oddGrids = [
      ...this.gameStateService.grid1,
      ...this.gameStateService.grid3,
      ...this.gameStateService.grid5,
      ...this.gameStateService.grid7,
      ...this.gameStateService.grid9,
    ];
    // toggle state
    const toggled = !this.gameStateService.checkedGrid();
    this.gameStateService.checkedGrid.set(toggled);
    console.log('toggled', toggled);

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
    const cellById = document.getElementById(targetCellId);
    if (cellById === null) {
      console.error('cellById', cellById, ' not found.');
      return;
    }
    const guess = cellById.querySelector(`#GV${value}`);
    if (guess === null) {
      console.error('guess', guess, ' not found.');
      return;
    }

    this.renderer.addClass(guess, 'text-danger');
  }
}
