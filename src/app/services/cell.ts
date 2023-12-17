export interface Cell {
  id: string; // row and column
  guesses: number[];
  choice: number;
  puzzle: number;
  solution: number;
}

// https://en.wikipedia.org/wiki/Glossary_of_Sudoku
