# AngularSudoku2

## Deploy Github page

From main branch

```bash
npx ng build --base-href=/angular-sudoku2/
rm docs/*
mv /dist/browser/* /docs/
git add docs/
git commit .
git push 
```

# TODO:

- guesses clearing on match choice: grid 
- local storage of game info
- Throw confetti on completing puzzle
- change cursor to match: mouse, pencil, pen
- Dark mode
- 
