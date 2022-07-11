import { compareArrays } from '../../utils/core/compare';

let milliseconds = 0;
let timesRun = 0;
let averageTime = 0;
const msThreshold = 3;

const runFunction = (arrOne, arrTwo) => {
  const t1 = performance.now();
  const retVal = compareArrays(arrOne, arrTwo);
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

  test('Should take in two arrays and return false if one of the values in one of the arrays does not match the other.', () => {
    const arrOne = ['hello', 43, true];
    const arrTwo = ['hello', 43, false];
    const retVal = runFunction(arrOne, arrTwo);
    expect(retVal).toBe(false);
  })

  test('Should take in two arrays and return false if they are not the same length.', () => {
    const arrOne = ['hello', 43, true];
    const arrTwo = ['hello', 43, true, false];
    const retVal = runFunction(arrOne, arrTwo);
    expect(retVal).toBe(false);
  })

  test('Should take in two arrays and match objects or other arrays inside those arrays.', () => {
    const today = new Date()
    const arrOne = ['hello', 43, true, { one: 'two', three: 'four', five: today }, ['five', 54, true, today]];
    const arrTwo = ['hello', 43, true, { one: 'two', three: 'four', five: today }, ['five', 54, true, today]];
    const retVal = runFunction(arrOne, arrTwo);
    expect(retVal).toBe(true);
  })

  test(`Should take an average time of less than ${msThreshold} milliseconds for the function to complete.`, () => {
    expect(averageTime).toBeLessThan(msThreshold);
  })

})