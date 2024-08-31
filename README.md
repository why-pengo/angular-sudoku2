# AngularSudoku2

## Deploy Github page

From main branch

```bash
npx ng build --base-href=/angular-sudoku2/
mv /dist/browser/* /docs/
git commit .
git push 
```

# TODO:

- guesses clearing on match choice
- local storage of game info
- Throw confetti on completing puzzle
