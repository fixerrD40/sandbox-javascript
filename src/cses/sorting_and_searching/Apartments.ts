import * as fs from 'fs';

function apartments() {
  const input: string = fs.readFileSync(0, 'utf-8');

  const tokens: string[] = input.trim().split(/\s+/);
  let ptr: number = 0;

  const nextToken = (): string => tokens[ptr++];

  const n = parseInt(nextToken());
  const m = parseInt(nextToken());
  const k = parseInt(nextToken());

  const applicants: number[] = Array(n);
  const apartments: number[] = Array(m);

  for (let i = 0; i < n; i++) {
    applicants[i] = parseInt(nextToken());
  }

  for (let i = 0; i < m; i++) {
    apartments[i] = parseInt(nextToken());
  }

  applicants.sort((a, b) => a-b);
  apartments.sort((a, b) => a-b);

  let result : number = 0;
  let apartmentPtr: number = 0;
  for (let i = 0; i < n; i++) {
    const applicant: number = applicants[i];
    while (apartments[apartmentPtr] - applicant <= k) {
      if (apartments[apartmentPtr] - applicant >= 0-k) {
        apartmentPtr++;
        result++;
        break;
      }
      apartmentPtr++;
    }
  }

  console.log(result);
}

apartments()
