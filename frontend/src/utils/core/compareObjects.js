import { isDate } from './jsonUtils';

const { compareObjects } = (object1, object2) => {
  if (!object1 || !object2 || typeof object1 !== 'object' || typeof object2 !== 'object') return false;
  const object1Keys = Object.keys(object1);
  for (let i = 0; i < object1Keys.length; i++) {
    const value1 = object1[object1Keys[i]];
    const value2 = object2[object1Keys[i]];
    if (value2 === undefined
      || (isDate(value2) ? new Date(`${value2}`).getTime() : typeof value2 === 'string' ? value2.trim() : value2) !== (isDate(value1) ? new Date(`${value1}`).getTime() : typeof value1 === 'string' ? value1.trim() : value1)) return false;
  }
  return true;
};

export default compareObjects;
