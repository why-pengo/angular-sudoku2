import { Routes } from '@angular/router';
import { CellDemoComponent } from './cell-demo/cell-demo.component';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'cell-demo', component: CellDemoComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full' }, // redirect to game
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
