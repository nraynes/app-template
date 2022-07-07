const {
  isDate,
  isObject,
  convertJsonArr,
  convertJsonObj,
  toJson,
  parseJson,
} = require('../../utils/core/jsonUtils');

let milliseconds = 0;
let timesRun = 0;
let averageTime = 0;
let anomalies = 0;
let anomolousTotal = 0;
const msThreshold = 0.02;

const resetAverage = () => {
  milliseconds = 0;
  timesRun = 0;
  averageTime = 0;
  anomalies = 0;
  anomolousTotal = 0;
}

const runFunction = (cb, ...args) => {
  const t1 = performance.now();
  const retVal = cb(...args);
  const t2 = performance.now();
  const t3 = t2 - t1;
  const add = (x = false) => {
    milliseconds += x ? anomolousTotal : t3;
    if (!x) timesRun++;
    averageTime = milliseconds / timesRun;
  }
  let thresholdReached = false;
  if (t3 > averageTime + 0.5) {
    anomalies++
    if (anomalies > 3) {
      thresholdReached = true;
      add();
    } else {
      anomolousTotal += t3
    }
    console.log(`The function ${cb} took an exceptionally long time on run ${timesRun} taking ${t3}ms to run.`)
  } else {
    add();
  }
  if (thresholdReached) add(true);
  return retVal;
}

describe('Testing JSON Utilities.', () => {

  describe('isDate Function', () => {

    test('Should take in a value and return true if that value is a date.', () => {
      const today = new Date();
      const retVal = runFunction(isDate, today);
      expect(retVal).toBe(true);
    })

    test('Should take in a value and return true if that value is a string in date format.', () => {
      const today = '2022-07-07T18:06:28.274Z';
      const retVal = runFunction(isDate, today);
      expect(retVal).toBe(true);
    })

    test('Should take in a value and return false if that value is a string in date format and the check exact argument is set.', () => {
      const today = `${new Date()}`;
      const retVal = runFunction(isDate, today, true);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is a string.', () => {
      let today = '';
      let retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = 'hello';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = 'This is a test.';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = 'Testing to make sure numbers like 5988828737 in strings dont affect the output.';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = '992838484';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = 'hellotest292938484';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = '1029398383hello';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = '19283 this is a test 99283';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = '[];;;)($$$%)]';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = 'test 1234';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = '1234 test';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = 'test 1234 test';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = 'io3245io6hn5jknl3lk453';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = '][35[523;5;kvjresj;253[erv($)#';
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is a number.', () => {
      const today = 1234;
      const retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is a boolean.', () => {
      let today = true;
      let retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = false;
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is an array.', () => {
      let today = [];
      let retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = ['hello', 'filler', 9292, true];
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is an object.', () => {
      let today = {};
      let retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
      today = {
        one: true,
        two: 'hello',
        three: 8283,
        four: [],
        five: new Date(),
      };
      retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is a function.', () => {
      const today = () => {};
      const retVal = runFunction(isDate, today);
      expect(retVal).toBe(false);
    })

    test(`Should take an average time of less than ${msThreshold} milliseconds for the function to complete.`, () => {
      expect(averageTime).toBeLessThan(msThreshold);
    })

  })

  describe('isObject Function', () => {

    resetAverage()

    test('Should take in a value and return false if that value is a date.', () => {
      const today = new Date();
      const retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is a string.', () => {
      let today = '';
      let retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = 'hello';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = 'This is a test.';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = 'Testing to make sure numbers like 5988828737 in strings dont affect the output.';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = '992838484';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = 'hellotest292938484';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = '1029398383hello';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = '19283 this is a test 99283';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = '[];;;)($$$%)]';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = 'test 1234';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = '1234 test';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = 'test 1234 test';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = 'io3245io6hn5jknl3lk453';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = '][35[523;5;kvjresj;253[erv($)#';
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is a number.', () => {
      const today = 1234;
      const retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is a boolean.', () => {
      let today = true;
      let retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = false;
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return false if that value is an array.', () => {
      let today = [];
      let retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
      today = ['hello', 'filler', 9292, true];
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
    })

    test('Should take in a value and return true if that value is an object.', () => {
      let today = {};
      let retVal = runFunction(isObject, today);
      expect(retVal).toBe(true);
      today = {
        one: true,
        two: 'hello',
        three: 8283,
        four: [],
        five: new Date(),
      };
      retVal = runFunction(isObject, today);
      expect(retVal).toBe(true);
    })

    test('Should take in a value and return false if that value is an empty object and the not empty argument is set.', () => {
      let today = {};
      let retVal = runFunction(isObject, today, true);
      expect(retVal).toBe(false);
      today = {
        one: true,
        two: 'hello',
        three: 8283,
        four: [],
        five: new Date(),
      };
      retVal = runFunction(isObject, today, true);
      expect(retVal).toBe(true);
    })

    test('Should take in a value and return false if that value is a function.', () => {
      const today = () => {};
      const retVal = runFunction(isObject, today);
      expect(retVal).toBe(false);
    })

    test(`Should take an average time of less than ${msThreshold} milliseconds for the function to complete.`, () => {
      expect(averageTime).toBeLessThan(msThreshold);
    })

  })

  describe('convertJsonArr Function', () => {

    resetAverage()

    test('Should take in an array that was converted from json and recurse through to fix all the values to get the original array back.', () => {
      const today = new Date()
      const someDate = new Date(2293944)
      const originalArray = [
        today,
        'hello',
        someDate,
        8293,
        true,
        'Test',
        { one: 'value', two: someDate },
        [
          today,
          'hello',
          someDate,
          8293,
          true,
          'Test',
          { one: 'value', two: someDate },
        ],
      ]
      const jsonConvertedArray = JSON.stringify(originalArray);
      const parsedArray = JSON.parse(jsonConvertedArray);
      expect(typeof parsedArray[0]).toBe('string')
      expect(isDate(parsedArray[0])).toBe(true);
      expect(typeof parsedArray[2]).toBe('string')
      expect(isDate(parsedArray[2])).toBe(true);
      expect(parsedArray[0]).not.toEqual(originalArray[0])
      expect(parsedArray[1]).toEqual(originalArray[1])
      expect(parsedArray[2]).not.toEqual(originalArray[2])
      expect(parsedArray[3]).toEqual(originalArray[3])
      expect(parsedArray[4]).toEqual(originalArray[4])
      expect(parsedArray[5]).toEqual(originalArray[5])
      expect(parsedArray[6]).not.toEqual(originalArray[6])
      expect(parsedArray[7][0]).not.toEqual(originalArray[7][0])
      expect(parsedArray[7][1]).toEqual(originalArray[7][1])
      expect(parsedArray[7][2]).not.toEqual(originalArray[7][2])
      expect(parsedArray[7][3]).toEqual(originalArray[7][3])
      expect(parsedArray[7][4]).toEqual(originalArray[7][4])
      expect(parsedArray[7][5]).toEqual(originalArray[7][5])
      expect(parsedArray[7][6]).not.toEqual(originalArray[7][6])
      const newArray = runFunction(convertJsonArr, parsedArray);
      expect(newArray[0]).toEqual(originalArray[0])
      expect(newArray[1]).toEqual(originalArray[1])
      expect(newArray[2]).toEqual(originalArray[2])
      expect(newArray[3]).toEqual(originalArray[3])
      expect(newArray[4]).toEqual(originalArray[4])
      expect(newArray[5]).toEqual(originalArray[5])
      expect(newArray[6]).toEqual(originalArray[6])
      expect(newArray[7][0]).toEqual(originalArray[7][0])
      expect(newArray[7][1]).toEqual(originalArray[7][1])
      expect(newArray[7][2]).toEqual(originalArray[7][2])
      expect(newArray[7][3]).toEqual(originalArray[7][3])
      expect(newArray[7][4]).toEqual(originalArray[7][4])
      expect(newArray[7][5]).toEqual(originalArray[7][5])
      expect(newArray[7][6]).toEqual(originalArray[7][6])
    })

  })

})