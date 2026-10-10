import * as fs from 'fs';

function burstBalloons() {
  const input: string = fs.readFileSync(0, 'utf-8');
  const tokens: string[] = input.trim().split(/\s+/);

  const n = tokens.length;

  if (n === 0) {
    console.log(0);
    return;
  }

  let ptr: number = 0;
  const nextToken = (): string => tokens[ptr++];

  const balloons: number[] = [];
  balloons.push(1);

  while (ptr < n) {
    balloons.push(parseInt(nextToken(), 10));
  }

  balloons.push(1);

  const memo: number[][] = Array.from({ length: n+2 }, () => Array(n+2).fill(0));

  for (let len = 1; len <= n; len++) {
    
    for (let left = 1; left <= n-len+1; left++) {
      let right: number = left+len-1;

      for (let k = left; k <= right; k++) {
        let leftBest: number = memo[left][k-1];
        let rightBest: number = memo[k+1][right];

        let andLast = balloons[left-1] * balloons[k] * balloons[right+1];

        memo[left][right] = Math.max(memo[left][right], leftBest + andLast + rightBest);
      }
    }
  }

  console.log(memo[1][n]);
}

burstBalloons()
