/* eslint-disable no-undef */
import padZeros from '../../utils/formatters/padZeros';

describe('Pad Zeros Function Test', () => {
   
  test('Should add zeros to a string.', () => {
    let retVal = padZeros('test', 6);
    expect(retVal).toEqual('00test');
    retVal = padZeros(22, 4);
    expect(retVal).toEqual('0022');
  });

});