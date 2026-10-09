import * as fs from 'fs';

function missingNumber() {
  const input: string = fs.readFileSync(0, 'utf-8');

  const tokens: string[] = input.trim().split(/\s+/);
  let ptr: number = 0;

  const nextToken = (): string => tokens[ptr++];

  const n = parseInt(nextToken(), 10);
  const present: boolean[] = new Array(n+1).fill(false);

  for (let i = 1; i < n; i++) {
    let number = parseInt(nextToken(), 10);
    present[number] = true;
  }

  for (let i = 1; i <= n; i++) {
    if (!present[i]) {
      console.log(i);
    }
  }
}

missingNumber()
