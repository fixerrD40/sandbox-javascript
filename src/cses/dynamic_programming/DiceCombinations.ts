import * as fs from 'fs';

const FACES = 6;
const MOD = 1000000007;

function diceCombinations() {
  const input: string = fs.readFileSync(0, 'utf-8');

  const tokens: string[] = input.trim().split(/\s+/);
  let ptr = 0;

  const nextToken = (): string => tokens[ptr++];

  const n = parseInt(nextToken());

  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= FACES; j++) {
      if (i-j >= 0) {
         dp[i] = (dp[i] + dp[i-j]) % MOD;
      }
    }
  }

  console.log(dp[n].toString());
}

diceCombinations()
