/* eslint-disable no-undef */
const addHours = require('../../utils/misc/addHours');

describe('Add Hours Function Test', () => {

  test('Should add a certain number of hours to a date object.', () => {
    const today = new Date();
    const expected = new Date(today.getTime() + 2 * 60 * 60 * 1000);
    const addedDate = addHours(2, today);
    expect(addedDate.toString()).toEqual(expected.toString());
  });

});