/* eslint-disable no-undef */
import encode from '../../utils/core/encode';

describe('Test for encode function.', () => {

  test('Should take in a file and output a compressed base64 string.', async () => {
    const check = (response) => {
      expect(response).toEqual(expect.any(String));
    };
    const testFile = new File([new Blob()], 'test');
    encode(testFile, check);
  });

});