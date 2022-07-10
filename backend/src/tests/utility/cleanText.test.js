const cleanText = require('../../utils/misc/cleanText');

describe('Clean Text Function test', () => {

  test('Should return with false when foul language is found in a string.', () => {
    const input = 'F-uck I am so over the a$$hole at work.'
    const retVal = cleanText(input)
    expect(retVal).toBe(false)
  })

  test('Should return with true when no foul language is found in a string.', () => {
    const input = 'There is nothing wrong with potatoes. They taste like glass.'
    const retVal = cleanText(input)
    expect(retVal).toBe(true)
  })

})