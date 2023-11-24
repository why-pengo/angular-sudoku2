import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
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
        console.log('no border');
        console.log('after', node.classList.value);
      } else {
        this.renderer.addClass(node, 'border');
        this.renderer.addClass(node, 'border-danger');
        this.renderer.addClass(node, 'rounded');
        console.log('border');
        console.log('after', node.classList.value);
      }
    });
  }
}
