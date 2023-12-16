import { Injectable, signal } from '@angular/core';
import { SudokuCreator } from '@algorithm.ts/sudoku';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  checkedGrid = signal<boolean>(false);
  gameOn = false;
  puzzle = {};
  solution = {};
  wasGuess = false;
  numberClicked = '0';
  curHlCellId = '0';
  // TODO: implement modes
  commandMode = true; // command mode: highlighting, etc
  writeMode = false; // filling squares in pencil or pen mode
  pencilMode = true;
  penMode = true;
  // 3 x 3 = 9
  creator = new SudokuCreator({ childMatrixWidth: 3 });
  sudoku = this.creator.createSudoku(1.0);
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  rowsCount = Array.from(Array(this.rows.length).keys())
    .map((x) => x + 1)
    .map(String);
  grid1 = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'];
  grid2 = ['A4', 'B4', 'C4', 'A5', 'B5', 'C5', 'A6', 'B6', 'C6'];
  grid3 = ['A7', 'B7', 'C7', 'A8', 'B8', 'C8', 'A9', 'B9', 'C9'];
  grid4 = ['D1', 'E1', 'F1', 'D2', 'E2', 'F2', 'D3', 'E3', 'F3'];
  grid5 = ['D4', 'E4', 'F4', 'D5', 'E5', 'F5', 'D6', 'E6', 'F6'];
  grid6 = ['D7', 'E7', 'F7', 'D8', 'E8', 'F8', 'D9', 'E9', 'F9'];
  grid7 = ['G1', 'H1', 'I1', 'G2', 'H2', 'I2', 'G3', 'H3', 'I3'];
  grid8 = ['G4', 'H4', 'I4', 'G5', 'H5', 'I5', 'G6', 'H6', 'I6'];
  grid9 = ['G7', 'H7', 'I7', 'G8', 'H8', 'I8', 'G9', 'H9', 'I9'];

  // }

  constructor() {}
}
