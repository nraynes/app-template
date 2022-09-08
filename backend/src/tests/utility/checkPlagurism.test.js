/* eslint-disable no-undef */
const checkPlagurism = require('../../utils/misc/checkPlagurism');

describe('Check Plagurism Function Test', () => {

  const check = 'At that moment he had a thought that he\'d never imagine he\'d consider. "I could just cheat," he thought, "and that would solve the problem." He tried to move on from the thought but it was persistent. It didn\'t want to go away and, if he was honest with himself, he didn\'t want it to.';

  test('Should respond with true if the input matches at least 60% of the comparing string.', () => {
    const input = 'At that moment he had a thought that he\'d never imagine he\'d consider. "I could just cheat," he thought, "and that would solve the problem." He tried to move on from the thought but it was persistent. It didn\'t want to go away and, if he was honest with himself';
    const retVal = checkPlagurism(input, check);
    expect(retVal).toBe(true);
  });

  test('Should respond with false if the input does not matches at least 60% of the comparing string.', () => {
    const input = 'At that moment he had a thought';
    const retVal = checkPlagurism(input, check);
    expect(retVal).toBe(false);
  });

  test('Should respond with the percentage matched when specified.', () => {
    const input = 'At that moment he had a thought that he\'d never imagine he\'d consider. "I could just cheat," he';
    const retVal = checkPlagurism(input, check, true);
    expect(retVal).toBe(32.72727272727273);
  });

});