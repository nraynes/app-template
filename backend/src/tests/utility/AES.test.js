/* eslint-disable no-undef */
const { encrypt, decrypt } = require('../../utils/core/AES');

const inputVal = 'The quick brown fox jumped over the yellow fence.';
const encrypedVal = encrypt(inputVal);
const decryptedVal = decrypt(encrypedVal);

describe('Encryption and Decryption.', () => {

  test('Encryption function should take in a string and return the encrypted value.', () => {
    expect(encrypedVal).toEqual('44KHmEMn0QbgkaINSeJs0pD/765Kqyk96IVnVcinyrvJ6heq+j7LjRx9nvTMlPMIeKBf9y0qDh7B');
  });

  test('Decryption function should take in an encrypted value and return the original plain text.', () => {
    expect(decryptedVal).toEqual(inputVal);
  });

});