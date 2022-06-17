/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const { isDate } = require('./jsonUtils');

// This function will compare to see if the keys and values in object 1 are included in object2.
// function compareObjects(object1, object2) {
//   if (typeof object1 !== 'object' || typeof object2 !== 'object') {
//     return false;
//   }
//   const object1Keys = Object.keys(object1);
//   const object1Vals = Object.values(object1);
//   const object2Keys = Object.keys(object2);
//   const object2Vals = Object.values(object2);
//   let retVal = true;
//   for (let i = 0; i < object1Keys.length; i++) {
//     let match = false;
//     for (let j = 0; j < object2Keys.length; j++) {
//       const curKey1 = object1Keys[i];
//       const curKey2 = object2Keys[j];
//       let curVal1 = isDate(object1Vals[i]) ? object1Vals[i].getTime() : object1Vals[i];
//       let curVal2 = isDate(object2Vals[j]) ? object2Vals[j].getTime() : object2Vals[j];
//       if (typeof curVal1 === 'string') { curVal1 = curVal1.trim(); }
//       if (typeof curVal2 === 'string') { curVal2 = curVal2.trim(); }
//       if (curKey1 === curKey2 && curVal1 === curVal2) { match = true; }
//     }
//     if (match === false) { retVal = false; }
//   }
//   return retVal;
// }

// Rewritten to have a linear time complexity.
// New function is On and is approximately 26 times faster than the previous function given a fixed sample size.
const compareObjects = (object1, object2, caseInsensitive = false) => {
  if (!object1 || !object2 || typeof object1 !== 'object' || typeof object2 !== 'object') return false;
  const object1Keys = Object.keys(object1);
  for (let i = 0; i < object1Keys.length; i++) {
    const value1 = object1[object1Keys[i]];
    const value2 = object2[object1Keys[i]];
    if (value2 === undefined
      || (isDate(value2)
        ? new Date(`${value2}`).getTime()
        : typeof value2 === 'string'
          ? caseInsensitive
            ? value2.trim().toLowerCase()
            : value2.trim()
              : value2) !== (isDate(value1)
                ? new Date(`${value1}`).getTime()
                  : typeof value1 === 'string'
                    ? caseInsensitive
                      ? value1.trim().toLowerCase()
                      : value1.trim()
                        : value1)) return false;
  }
  return true;
};

module.exports = compareObjects;
