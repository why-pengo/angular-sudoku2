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

  toggleBorderBySelector(event: Event, selector: string): void {
    let target = event.target as HTMLInputElement;
    console.log('target', target);
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

  toggleVisibilityBySelector(event: Event, selector: string): void {
    let target = event.target as HTMLInputElement;
    console.log('target', target);
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
    oddGrids.forEach((id) => {
      const cellById = document.getElementById(id);
      if (cellById && cellById.classList.contains('bg-dark')) {
        this.renderer.removeClass(cellById, 'bg-dark');
        this.renderer.removeClass(cellById, 'text-white');
      } else {
        this.renderer.addClass(cellById, 'bg-dark');
        this.renderer.addClass(cellById, 'text-white');
      }
    });
  }
}
