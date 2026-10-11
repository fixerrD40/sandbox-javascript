import * as fs from 'fs';

/*
 * This did not pass, implement coordinate compression and maybe it will
 * I got what I came for
 */
function nestedRangesCount() {
  const input: string = fs.readFileSync(0, 'utf-8');

  const tokens: string[] = input.trim().split(/\s+/);
  let ptr = 0;

  const nextToken = (): string => tokens[ptr++];

  const n: number = parseInt(nextToken(), 10);

  const starts = new Int32Array(n);
  const ends = new Int32Array(n);
  const indices = new Int32Array(n);

  let maxStart: number = 0;
  let maxEnd: number = 0;

  for (let i = 0; i < n; i++) {
    const start: number = parseInt(nextToken(), 10);
    const end: number = parseInt(nextToken(), 10);
    starts[i] = start;
    ends[i] = end;
    indices[i] = i;
    if (start > maxStart) maxStart = start;
    if (end > maxEnd) maxEnd = end;
  }

  indices.sort((a, b) => {
    const result = starts[a] - starts[b];
    if (result !== 0) return result;
    return ends[b] - ends[a]; 
  });

  const ended: FenwickTree = new FenwickTree(maxEnd);
  const result1: number[] = Array(n);
  
  for (let i = n-1; i >= 0; i--) {
    const range: number = indices[i];
    result1[range] = ended.query(ends[range]);
    ended.update(ends[range], 1);
  }

  const started: FenwickTree = new FenwickTree(maxEnd);
  const result2: number[] = Array(n);

  for (let i = 0; i < n; i++) {
    const range: number = indices[i];
    result2[range] = started.query(maxEnd) - started.query(ends[range] - 1);
    started.update(ends[range], 1);
  }

  console.log(result1.join(" "));
  console.log(result2.join(" "));
}

class FenwickTree {
  readonly capacity: number;
  private readonly tree: Int32Array;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.tree = new Int32Array(capacity+1);
  }

  update(i: number, delta: number): void {
    while (i <= this.capacity) {
      this.tree[i] += delta;
      i += i & -i;
    }
  }

  query(i: number): number {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i;
    }

    return sum;
  }
}

nestedRangesCount()
