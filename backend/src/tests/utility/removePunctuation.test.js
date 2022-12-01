/* eslint-disable no-undef */
const removePuncuationFromText = require('../../utils/misc/removePunctuation');

describe('Remove Punctuation function test', () => {

  test('Should remove the punctuation from a string.', () => {
    const retVal = removePuncuationFromText('The quick browns "fox" jumped over th]e y%ellow fence.');
    expect(retVal).toEqual('The quick browns fox jumped over the yellow fence');
  });

});