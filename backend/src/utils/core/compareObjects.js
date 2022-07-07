/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const { isDate } = require('./jsonUtils');

const compareObjects = (object1, object2, caseInsensitive = false) => {
  // Check to see if input objects are even objects or if any were given at all.
  if (!object1 || !object2 || typeof object1 !== 'object' || typeof object2 !== 'object') {
    return false;
  }
  // Grap the keys for object 1 and lopop through them, grabbing the values of each index.
  const object1Keys = Object.keys(object1);
  for (let i = 0; i < object1Keys.length; i++) {
    const value1 = object1[object1Keys[i]];
    const value2 = object2[object1Keys[i]];
    // If anything doesnt match, return false
    if (value2 === undefined || (isDate(value2)
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

// const compareObjects = (object1, object2, caseInsensitive = false) => {
//   if (!object1 || !object2 || typeof object1 !== 'object' || typeof object2 !== 'object') return false;
//   const object1Keys = Object.keys(object1);
//   for (let i = 0; i < object1Keys.length; i++) {
//     const value1 = object1[object1Keys[i]];
//     const value2 = object2[object1Keys[i]];
//     if (value2 === undefined
//       || (isDate(value2)
//         ? new Date(`${value2}`).getTime()
//         : typeof value2 === 'string'
//           ? caseInsensitive
//             ? value2.trim().toLowerCase()
//             : value2.trim()
//               : value2) !== (isDate(value1)
//                 ? new Date(`${value1}`).getTime()
//                   : typeof value1 === 'string'
//                     ? caseInsensitive
//                       ? value1.trim().toLowerCase()
//                       : value1.trim()
//                         : value1)) return false;
//   }
//   return true;
// };

module.exports = compareObjects;
