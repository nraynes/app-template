/* eslint-disable no-undef */
const pick = require('../../utils/formatters/pick');

describe('Pick Function tests', () => {

  test('Should pick specified key value pairs from an object.', () => {
    const obj = {
      one: 'test',
      two: 'hello',
      three: 453,
      four: true,
      five: false,
    };
    const newObj = pick(obj, ['two', 'four']);
    expect(newObj.one).not.toBeDefined();
    expect(newObj.two).toEqual('hello');
    expect(newObj.three).not.toBeDefined();
    expect(newObj.four).toEqual(true);
    expect(newObj.five).not.toBeDefined();
  });

});