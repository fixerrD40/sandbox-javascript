// Start with synchronous vs asynchronous code, observe the behavior with console.console.log.
setImmediate(() => {
  console.log('asynchronous');
});

console.log('synchronous');

// Explore callbacks, microtasks, tiemrs, and event loop phases.
// Devs seem to be surrendering control -> fs/promises inverts the i/o callback out. See helloWorldPromises.js.
const { writeFile } = require("fs");

const FILE_NAME = 'test.txt';
const myCallback = (data) => {
  console.log("Processed:", data);
};

writeFile(FILE_NAME, 'data', () => {
  setTimeout(myCallback, 0, "timer");

  setImmediate(myCallback, "immediate");

  // Promise.then(callback) does not propagate arguments, dedicate a callback
  Promise.resolve().then(() => myCallback("callback"));

  process.nextTick(myCallback, "nextTick");

  myCallback('synchronous');
});

// Write a cpu-bound loop that blocks Node, then refactor it with setImmediate to yield.
cpuBoundWorkYielding(3000, 50);

function cpuBoundWork(durationMs) {
  const startTime = Date.now();
  while (Date.now() - startTime < durationMs) {
    // This loop effectively "freezes" the main thread
    // No other callbacks can execute during this time
  }

  const elapsed = Date.now() - startTime;
  myCallback(`cpu-bound work completed in ${elapsed}ms`);
}

// Do cpu-bound work in chunks, yielding in-between
async function cpuBoundWorkYielding(totalDurationMs, chunkDurationMs = 20) {
  const startTime = Date.now();
  let timeRun = 0;

  // Process [chunkDurationMs]
  // If work remains, schedule recursive call immediately
  // note: setImmediate() from check phase addresses the next check phase, hence the yield
  async function runChunk() {
    const runTime = Math.min(chunkDurationMs, totalDurationMs - runTime);
    const chunkEnd = Date.now() + runTime;

    while(Date.now() < chunkEnd) {
      // *small piece of synchronous work here
    }
    timeRun += chunkRunTime;

    console.log('ran chunk');

    if (timeRun < totalDurationMs) {
      return new Promise((resolve) => { setImmediate(() => resolve(runChunk())); });
    }
  }

  await runChunk();

  const elapsed = Date.now() - startTime;
  myCallback(`cpu-bound work completed in ${elapsed}ms`);
}

// Experiment with file I/O or network I/O to see how Node overlaps works.
const { readFile, unlink } = require("fs");

console.log("Reading File");

readFile(FILE_NAME, (_, data) => {
  console.log(`Read: ${data.toString()}`);

  unlink(FILE_NAME, () => {});
});
