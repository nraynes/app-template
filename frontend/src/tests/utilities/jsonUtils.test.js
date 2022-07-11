import  {
  isDate,
  isObject,
  convertJsonArr,
  convertJsonObj,
  toJson,
  parseJson,
} from '../../utils/core/jsonUtils';

let milliseconds = 0;
let timesRun = 0;
let averageTime = 0;
let anomalies = 0;
let anomolousTotal = 0;
const msThreshold = 0.035;

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

    test('Should take in a value and return false if that value is null.', () => {
      const today = null;
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

  describe('convertJsonObj Function', () => {

    resetAverage()

    test('Should take in a JSON Parsed object and recurse through it to restore it to its original form.', () => {
      const today = new Date()
      const someDate = new Date(2293944)
      const originalObject = {
        one: 'test',
        two: 42,
        three: 388.03,
        four: true,
        five: false,
        six: today,
        seven: {
          one: 'test',
          two: someDate,
          three: [
            'test',
            42,
            { one: 'test', two: someDate },
          ]
        },
        eight: [
          'test',
          today,
          { one: someDate, two: 'test' },
        ]
      };
      const jsonConvertedObject = JSON.stringify(originalObject);
      const parsedObject = JSON.parse(jsonConvertedObject);
      expect(parsedObject.one).toEqual(originalObject.one)
      expect(parsedObject.two).toEqual(originalObject.two)
      expect(parsedObject.three).toEqual(originalObject.three)
      expect(parsedObject.four).toEqual(originalObject.four)
      expect(parsedObject.five).toEqual(originalObject.five)
      expect(parsedObject.six).not.toEqual(originalObject.six)
      expect(parsedObject.seven.one).toEqual(originalObject.seven.one)
      expect(parsedObject.seven.two).not.toEqual(originalObject.seven.two)
      expect(parsedObject.seven.three[0]).toEqual(originalObject.seven.three[0])
      expect(parsedObject.seven.three[1]).toEqual(originalObject.seven.three[1])
      expect(parsedObject.seven.three[2].one).toEqual(originalObject.seven.three[2].one)
      expect(parsedObject.seven.three[2].two).not.toEqual(originalObject.seven.three[2].two)
      expect(parsedObject.eight[0]).toEqual(originalObject.eight[0])
      expect(parsedObject.eight[1]).not.toEqual(originalObject.eight[1])
      expect(parsedObject.eight[2].one).not.toEqual(originalObject.eight[2].one)
      expect(parsedObject.eight[2].two).toEqual(originalObject.eight[2].two)
      const newObject = runFunction(convertJsonObj, parsedObject);
      expect(newObject.one).toEqual(originalObject.one)
      expect(newObject.two).toEqual(originalObject.two)
      expect(newObject.three).toEqual(originalObject.three)
      expect(newObject.four).toEqual(originalObject.four)
      expect(newObject.five).toEqual(originalObject.five)
      expect(newObject.six).toEqual(originalObject.six)
      expect(newObject.seven.one).toEqual(originalObject.seven.one)
      expect(newObject.seven.two).toEqual(originalObject.seven.two)
      expect(newObject.seven.three[0]).toEqual(originalObject.seven.three[0])
      expect(newObject.seven.three[1]).toEqual(originalObject.seven.three[1])
      expect(newObject.seven.three[2].one).toEqual(originalObject.seven.three[2].one)
      expect(newObject.seven.three[2].two).toEqual(originalObject.seven.three[2].two)
      expect(newObject.eight[0]).toEqual(originalObject.eight[0])
      expect(newObject.eight[1]).toEqual(originalObject.eight[1])
      expect(newObject.eight[2].one).toEqual(originalObject.eight[2].one)
      expect(newObject.eight[2].two).toEqual(originalObject.eight[2].two)
    })

  })

  describe('toJson Function', () => {

    test('Should convert something to json string.', () => {
      const someDate = new Date(2293944)
      const myObj = {
        one: 'test',
        two: 42,
        three: 388.03,
        four: true,
        five: false,
        six: someDate,
        seven: {
          one: 'test',
          two: someDate,
          three: [
            'test',
            42,
            { one: 'test', two: someDate },
          ]
        },
        eight: [
          'test',
          someDate,
          { one: someDate, two: 'test' },
        ]
      };
      const jsonObj = toJson(myObj);
      expect(jsonObj).toEqual('{\"one\":\"test\",\"two\":42,\"three\":388.03,\"four\":true,\"five\":false,\"six\":\"1970-01-01T00:38:13.944Z\",\"seven\":{\"one\":\"test\",\"two\":\"1970-01-01T00:38:13.944Z\",\"three\":[\"test\",42,{\"one\":\"test\",\"two\":\"1970-01-01T00:38:13.944Z\"}]},\"eight\":[\"test\",\"1970-01-01T00:38:13.944Z\",{\"one\":\"1970-01-01T00:38:13.944Z\",\"two\":\"test\"}]}');
    })
    
  })

  describe('parseJson Function', () => {

    test('Should revert a json string back to its original form.', () => {
      const someDate = new Date(2293944)
      const originalObject = {
        one: 'test',
        two: 42,
        three: 388.03,
        four: true,
        five: false,
        six: someDate,
        seven: {
          one: 'test',
          two: someDate,
          three: [
            'test',
            42,
            { one: 'test', two: someDate },
          ]
        },
        eight: [
          'test',
          someDate,
          { one: someDate, two: 'test' },
        ]
      };
      const jsonObj = toJson(originalObject);
      const parsedJsonObj = parseJson(jsonObj);
      expect(parsedJsonObj.one).toEqual(originalObject.one)
      expect(parsedJsonObj.two).toEqual(originalObject.two)
      expect(parsedJsonObj.three).toEqual(originalObject.three)
      expect(parsedJsonObj.four).toEqual(originalObject.four)
      expect(parsedJsonObj.five).toEqual(originalObject.five)
      expect(parsedJsonObj.six).toEqual(originalObject.six)
      expect(parsedJsonObj.seven.one).toEqual(originalObject.seven.one)
      expect(parsedJsonObj.seven.two).toEqual(originalObject.seven.two)
      expect(parsedJsonObj.seven.three[0]).toEqual(originalObject.seven.three[0])
      expect(parsedJsonObj.seven.three[1]).toEqual(originalObject.seven.three[1])
      expect(parsedJsonObj.seven.three[2].one).toEqual(originalObject.seven.three[2].one)
      expect(parsedJsonObj.seven.three[2].two).toEqual(originalObject.seven.three[2].two)
      expect(parsedJsonObj.eight[0]).toEqual(originalObject.eight[0])
      expect(parsedJsonObj.eight[1]).toEqual(originalObject.eight[1])
      expect(parsedJsonObj.eight[2].one).toEqual(originalObject.eight[2].one)
      expect(parsedJsonObj.eight[2].two).toEqual(originalObject.eight[2].two)
    })
    
  })

})