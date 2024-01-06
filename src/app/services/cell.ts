export interface Cell {
  id: string; // row and column
  guesses: number[]; // array of guesses
  choice: number; // users correct selection of number for cell
  puzzle: number; // puzzle value (number or null) for sudoku engine
  solution: number; // solution/correct value for puzzle
}

// https://en.wikipedia.org/wiki/Glossary_of_Sudoku
