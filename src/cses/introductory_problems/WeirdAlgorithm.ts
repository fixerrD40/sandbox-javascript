import * as fs from 'fs';

function solve() {
    // 1. Read all input from stdin (File Descriptor 0)
    const input: string = fs.readFileSync(0, 'utf-8');
    
    // 2. Split by any whitespace (spaces, newlines) to get a clean token array
    const tokens: string[] = input.trim().split(/\s+/);
    let ptr: number = 0;
    
    // Helper function to pull the next token
    const nextToken = (): string => tokens[ptr++];

    // --- YOUR CSES LOGIC HERE ---
    const n = parseInt(nextToken(), 10);

    let cur = n;
    const result: number[] = [];
    result.push(n);
    
    while (cur != 1) {
      if (cur%2 == 0) {
        cur = cur/2;
      } else {
        cur = cur*3+1;
      }
      result.push(cur);
    }
    
    // Output your result
    console.log(result.join(' '));
}

solve();
