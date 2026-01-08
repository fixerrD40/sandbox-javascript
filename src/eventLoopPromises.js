const { writeFile, unlink } = require("fs/promises");

const FILE_NAME = 'test.txt';

createFile();

async function createFile() {
  console.log('enter');

  // async writeFile
  await writeFile(FILE_NAME, 'data');
  // everything after the await is scheduled.
  // This is implemented by wrapping it in callback to fs/promises.writeFile
  unlink(FILE_NAME);
  console.log('io');

  // launch timer
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("timer");
      resolve();
    }, 0);
  });

  // launch immediate
  new Promise((resolve) => {
    setImmediate(() => {
      console.log("immediate");
      resolve();
    });
  });

  console.log("exit");
}
