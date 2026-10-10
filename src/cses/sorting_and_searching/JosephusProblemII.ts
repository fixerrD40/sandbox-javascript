import * as fs from 'fs';

function jospehusProblemII() {
  const input: string = fs.readFileSync(0, 'utf-8');

  const tokens: string[] = input.trim().split(/\s+/);
  let ptr: number = 0;

  const nextToken = (): string => tokens[ptr++];

  const n: number = parseInt(nextToken());
  const k: number = parseInt(nextToken());

  const ring: FenwickTree = FenwickTree.createRing(n);
  const result: number[] = [];

  let remaining = n;
  let selectedChild = 0;
  while (remaining > 0) {
    selectedChild = (selectedChild + k) % remaining;

    const position: number = ring.find(selectedChild+1);
    ring.select(position);
    result.push(position);
    remaining--;
  }

  console.log(result.join(" "));
}

class FenwickTree {
  private tree: Int32Array;
  private capacity: number;
  private maxPowerOf2: number;

  private constructor(capacity: number) {
    this.capacity = capacity;
    this.tree = new Int32Array(capacity + 1);
    this.maxPowerOf2 = capacity === 0 ? 0 : 1 << (31 - Math.clz32(capacity));
  }

  public static createRing(capacity: number): FenwickTree {
    const fenwick: FenwickTree = new FenwickTree(capacity);

    for (let i = 1; i <= capacity; i++) {
      fenwick.update(i, 1);
    }

    return fenwick;
  }

  private update(i: number, delta: number) {
    while (i <= this.capacity) {
      this.tree[i] += delta;
      i += i & -i;
    }
  }

  public select(i: number) {
    while (i <= this.capacity) {
      this.tree[i] -= 1;
      i += i & -i;
    }
  }

  public find(targetRank: number): number {
    let idx = 0;
    let current = 0;

    for (let step = this.maxPowerOf2; step > 0; step >>= 1) {
      const next = idx + step;

      if (next <= this.capacity && current + this.tree[next] < targetRank) {
        idx = next;
        current += this.tree[idx];
      }
    }

    return idx+1;
  }
}

jospehusProblemII()
