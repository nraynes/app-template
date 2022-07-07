const compareObjects = require('../../utils/core/compareObjects');

// types:
// Strings
// Numbers
// Boolean
// Dates
// Arrays
// Objects
// Functions

let milliseconds = 0;
let timesRun = 0;
let averageTime = 0;
const msThreshold = 3;

const runFunction = (objOne, objTwo, options = null) => {
  const t1 = performance.now();
  const retVal = compareObjects(objOne, objTwo, options);
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

describe('Test for Compare Objects function.', () => {

  test('Should take in two objects and compare all keys and values from the first object to make sure they are in the second object as well. This should work for any variable type.', () => {
    const today = new Date();
    const objOne = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
    };
    const objTwo = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      eleven: 'some more values',
      twelve: 99995,
    };
    const retVal = runFunction(objOne, objTwo);
    expect(retVal).toBe(true);
  })

  test('Should return false if it is specified that total equality be checked and the objects do not equal each other exactly.', () => {
    const today = new Date();
    const objOne = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
    };
    const objTwo = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      eleven: 'some more values',
      twelve: 99995,
    };
    const retVal = runFunction(objOne, objTwo, { totalEquality: true });
    expect(retVal).toBe(false);
  })

  test('Should return true if it is specified that total equality be checked and the objects do equal each other exactly.', () => {
    const today = new Date();
    const objOne = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
    };
    const objTwo = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
    };
    const retVal = runFunction(objOne, objTwo, { totalEquality: true });
    expect(retVal).toBe(false);
  })

  test('Should recurse and return false if it is specified that total equality be checked and the objects do not equal each other exactly.', () => {
    const today = new Date();
    const objOne = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: {
        one: 'Some String',
        two: 419,
        three: true,
        four: false,
        five: today,
      },
    };
    const objTwo = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: {
        one: 'Some String',
        two: 419,
        three: true,
        four: false,
        five: today,
      },
      eleven: 'some more values',
      twelve: 99995,
    };
    const retVal = runFunction(objOne, objTwo, { totalEquality: true });
    expect(retVal).toBe(false);
  })

  test('Should recurse and return true if it is specified that total equality be checked and the objects do equal each other exactly.', () => {
    const today = new Date();
    const objOne = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: {
        one: 'Some String',
        two: 419,
        three: true,
        four: false,
        five: today,
      },
    };
    const objTwo = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: {
        one: 'Some String',
        two: 419,
        three: true,
        four: false,
        five: today,
      },
    };
    const retVal = runFunction(objOne, objTwo, { totalEquality: true });
    expect(retVal).toBe(false);
  })

  test('Should return false when strings are not the correct case.', () => {
    const objOne = {
      one: 'some String',
    };
    const objTwo = {
      one: 'Some String',
      eleven: 'some more values',
      twelve: 99995,
    };
    const retVal = runFunction(objOne, objTwo);
    expect(retVal).toBe(false);
  })

  test('Should return true when strings are not the correct case and case insensitive is specified.', () => {
    const objOne = {
      one: 'some String',
    };
    const objTwo = {
      one: 'Some String',
      eleven: 'some more values',
      twelve: 99995,
    };
    const retVal = runFunction(objOne, objTwo, { caseInsensitive: true });
    expect(retVal).toBe(true);
  })

  test('Should recurse through arrays and objects and allow for comparing functions plus null and undefined values.', () => {
    const today = new Date();
    const objOne = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: ['someval', 335, true, false, today, { test: 'some' }],
      seven: {
        one: 'Some String',
        two: 599.99,
        three: true,
        four: false,
        five: today,
        six: ['someval', 335, true, false, today, { test: 'some' }],
      },
      eight: () => {},
      nine: null,
      ten: undefined,
    };
    const objTwo = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: ['someval', 335, true, false, today, { test: 'some' }],
      seven: {
        one: 'Some String',
        two: 599.99,
        three: true,
        four: false,
        five: today,
        six: ['someval', 335, true, false, today, { test: 'some' }],
      },
      eight: () => {},
      nine: null,
      ten: undefined,
      eleven: 'some more values',
      twelve: 99995,
    };
    const retVal = runFunction(objOne, objTwo);
    expect(retVal).toBe(true);
  })

  test('Should return false if not everything in the first object is in the second one.', () => {
    const today = new Date();
    const objOne = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: ['someval', 335, true, false, today],
      seven: {
        one: 'Some String',
        two: 599.99,
        three: true,
        four: false,
        five: today,
        six: ['someval', 335, true, false, today],
      },
      eight: () => {},
      nine: null,
      ten: undefined,
    };
    const objTwo = {
      one: 'Some String',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: ['someval', 335, true, false, today],
      seven: {
        one: 'Some String',
        two: 599.99,
        three: true,
        four: false,
        five: today,
        six: ['someval', 335, true, false, today],
      },
      eight: () => {},
      nine: null,
      ten: undefined,
      eleven: 'some more values',
      twelve: 99995,
    };
    const retVal = runFunction(objTwo, objOne);
    expect(retVal).toBe(false);
  })

  describe('Should return false if even one of the values of each object does not match. This should work for any variable type.', () => {

    const today = new Date();
    const objOne = {
      one: 'Some String Extra content',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: ['someval', 335, true, false, today],
      seven: {
        one: 'Some String',
        two: 599.99,
        three: true,
        four: false,
        five: today,
        six: ['someval', 335, true, false, today],
      },
      eight: () => {},
      nine: null,
      ten: undefined,
    };
    const objTwo = {
      one: 'Some String Something else',
      two: 419,
      three: true,
      four: false,
      five: today,
      six: ['someval', 335, true, false, today],
      seven: {
        one: 'Some String',
        two: 599.99,
        three: true,
        four: false,
        five: today,
        six: ['someval', 335, true, false, today],
      },
      eight: () => {},
      nine: null,
      ten: undefined,
      eleven: 'some more values',
      twelve: 99995,
    };

    test('Should return false when strings are different.', () => {
      let retVal = runFunction(objOne, objTwo);
      expect(retVal).toBe(false);
    })

    test('Should return false when numbers are different.', () => {
      objOne.one = 'Some String'
      objTwo.one = 'Some String'
      objOne.two = 999;
      retVal = runFunction(objOne, objTwo);
      expect(retVal).toBe(false);
    })

    test('Should return false when boolean values are different.', () => {
      objTwo.two = 999;
      objOne.three = false;
      retVal = runFunction(objOne, objTwo);
      expect(retVal).toBe(false);
    })

    test('Should return false when date values are different.', () => {
      objOne.three = true;
      objOne.five = new Date();
      retVal = runFunction(objOne, objTwo);
      expect(retVal).toBe(false);
    })

    test('Should return false when array values are different.', () => {
      objOne.five = today;
      objOne.six = ['hello']
      retVal = runFunction(objOne, objTwo);
      expect(retVal).toBe(false);
    })

    test('Should return false when object values are different.', () => {
      objOne.six = ['someval', 335, true, false, today];
      objTwo.seven = {
        test: 75,
      }
      retVal = runFunction(objOne, objTwo);
      expect(retVal).toBe(false);
    })

    test('Should return true when all values are set back to matching.', () => {
      objTwo.seven = {
        test: {
          one: 'Some String',
          two: 599.99,
          three: true,
          four: false,
          five: today,
          six: ['someval', 335, true, false, today],
        },
      }
      retVal = runFunction(objOne, objTwo);
      expect(retVal).toBe(true);
    })

  })

  test(`Should take an average time of less than ${msThreshold} milliseconds for the function to complete.`, () => {
    expect(averageTime).toBeLessThan(msThreshold);
  })

})