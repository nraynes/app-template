const checkForLinks = require('../../utils/misc/checkForLinks');

describe('Check for links function test', () => {

  test('Should identify when a string input is a link.', () => {
    const checkOne = checkForLinks('alsdkjfhajklshdlfjkhalksdf');
    const checkTwo = checkForLinks('https://hello.com');
    const checkThree = checkForLinks('http://www.hello.com');
    const checkFour = checkForLinks('www.hello.com');
    const checkFive = checkForLinks('testing this is http://hello.com');
    expect(checkOne).toBe(false)
    expect(checkTwo).toBe(true)
    expect(checkThree).toBe(true)
    expect(checkFour).toBe(true)
    expect(checkFive).toBe(true)
  })

})