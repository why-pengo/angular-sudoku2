import { GameComponent } from './game.component';

describe('GameComponent', () => {
  beforeEach(() => {
    // intercepts

    cy.viewport(1280, 720);
  });

  it('should create component', () => {
    cy.mount(GameComponent);
    cy.get('[data-cy=menu]').should('exist');
  });
});
