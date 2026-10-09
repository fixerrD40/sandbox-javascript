import * as fs from 'fs';

function josephusProblem() {
  const input: string = fs.readFileSync(0, 'utf-8');

  const tokens: string[] = input.trim().split(/\s+/);
  let ptr: number = 0;

  const nextToken = (): string => tokens[ptr++];

  const n = parseInt(nextToken());

  const queue: number[] = [];
  for (let i = 1; i <= n; i++) {
    queue.push(i);
  }

  let head = 0;
  const result: number[] = [];

  while (head < queue.length) {
    queue.push(queue[head++]);
    
    if (head >= queue.length) break;

    result.push(queue[head++]);
  }

  console.log(result.join(' '));
}

josephusProblem()
