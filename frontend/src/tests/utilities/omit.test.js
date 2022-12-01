/* eslint-disable no-undef */
import { omit } from '../../utils/formatters/omit';

describe('Omit Function tests', () => {

  test('Should omit specified key value pairs from an object.', () => {
    const obj = {
      one: 'test',
      two: 'hello',
      three: 453,
      four: true,
      five: false,
    };
    const newObj = omit(obj, ['two', 'four']);
    expect(newObj.one).toEqual('test');
    expect(newObj.two).not.toBeDefined();
    expect(newObj.three).toEqual(453);
    expect(newObj.four).not.toBeDefined();
    expect(newObj.five).toEqual(false);
  });

});