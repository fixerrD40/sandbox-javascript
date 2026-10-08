import { readFileSync } from "node:fs";

/**
 * Line-oriented stdin, same role as BufferedReader over System.in.
 *
 * Paste a sample into src/typescript/input_file.txt, then:
 *   npx tsx src/typescript/cses/introductory_problems/WeirdAlgorithm.ts < src/typescript/input_file.txt
 *
 * number is exact only through 2^53 - 1 (about 9e15). CSES values up to 10^18
 * need readBigInts().
 */
const lines = readFileSync(0, "utf8").split(/\r?\n/);
let index = 0;

export function readLine(): string {
  const line = lines[index] ?? "";
  index += 1;
  return line;
}

export function readTokens(line: string = readLine()): string[] {
  const trimmed = line.trim();
  if (trimmed.length === 0) return [];
  return trimmed.split(/\s+/);
}

export function readInts(line?: string): number[] {
  return readTokens(line).map((token) => Number(token));
}

export function readBigInts(line?: string): bigint[] {
  return readTokens(line).map((token) => BigInt(token));
}

export function readInt(): number {
  const value = readInts()[0];
  if (value === undefined) {
    throw new Error("expected an integer");
  }
  return value;
}

export function readBigInt(): bigint {
  const value = readBigInts()[0];
  if (value === undefined) {
    throw new Error("expected an integer");
  }
  return value;
}
