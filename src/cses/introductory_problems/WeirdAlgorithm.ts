import * as fs from 'fs';

function solve() {
    // 1. Read all input from stdin (File Descriptor 0)
    const input: string = fs.readFileSync(0, 'utf-8');
    
    // 2. Split by any whitespace (spaces, newlines) to get a clean token array
    const tokens: string[] = input.trim().split(/\s+/);
    let ptr: number = 0;
    
    // Helper function to pull the next token
    const nextToken = (): string => tokens[ptr++];
    const nextInt = (): number => parseInt(tokens[ptr++], 10);

    // --- YOUR CSES LOGIC HERE ---
    // Example: Reading N and an array of N elements
    if (ptr >= tokens.length || tokens[0] === '') return;
    
    const n = nextInt();
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
        arr.push(nextInt());
    }
    
    // Output your result
    console.log(arr.reverse().join(' '));
}

solve();
