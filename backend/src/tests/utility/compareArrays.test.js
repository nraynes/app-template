const { compareArrays } = require('../../utils/core/compare');

let milliseconds = 0;
let timesRun = 0;
let averageTime = 0;
const msThreshold = 3;

const runFunction = (arrOne, arrTwo, caseInsensitive = false) => {
  const t1 = performance.now();
  const retVal = compareArrays(arrOne, arrTwo, caseInsensitive);
  const t2 = performance.now();
  const t3 = t2 - t1;
  milliseconds += t3;
  timesRun++;
  averageTime = milliseconds / timesRun;
  if (t3 > averageTime + 0.5) {
    console.log(`The function took an exceptionally long time on run ${timesRun}.`)
  }
  return retVal;
}

describe('Compare Arrays Function Tests', () => {

  test('Should take in two arrays and return true if all of the values in the first array are also in the second one.', () => {
    const arrOne = ['hello', 43, true];
    const arrTwo = ['hello', 43, true];
    const retVal = runFunction(arrOne, arrTwo);
    expect(retVal).toBe(true);
  })

})