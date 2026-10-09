import * as fs from 'fs';

const DIMENSIONS: number = 8;
const board: boolean[][] = Array.from({ length: DIMENSIONS }, () => 
  new Array(DIMENSIONS).fill(false)
);
const placedQueens: number[] = Array(DIMENSIONS);
let result = 0;

function chessboardAndQueens() {
  const input: string = fs.readFileSync(0, 'utf-8');

  const tokens: string[] = input.trim().split(/\s+/);
  let ptr: number = 0;

  const nextToken = (): string => tokens[ptr++];

  for (let i = 0; i < DIMENSIONS; i++) {
    let row: string = nextToken();
    for (let j = 0; j < DIMENSIONS; j++) {
      if (row.charAt(j) === '*') {
        board[i][j] = true;
      }
    }
  }

  placeQueens(0);

  console.log(result);
}

function placeQueens(currentRow: number) {
  if (currentRow === DIMENSIONS) {
    result++;
    return;
  }

  for (let i = 0; i < DIMENSIONS; i++) {
    if (board[currentRow][i]) continue;

    placedQueens[currentRow] = i;
    
    if (isValid(currentRow)) {
      placeQueens(currentRow+1);
    }
  }
}

function isValid(currentRow: number) {
  for (let i = 0; i < currentRow; i++) {
    if (placedQueens[currentRow] === placedQueens[i]) {
      return false;
    }

    if (placedQueens[currentRow] + currentRow === placedQueens[i] + i) {
      return false;
    }

    if (placedQueens[currentRow] - currentRow === placedQueens[i] - i) {
      return false;
    }
  }

  return true;
}

chessboardAndQueens()
