import formatDate from '../../utils/formatters/format';

describe('Format date function.', () => {

  test('Should format the date given to it into a readable form.', () => {
    const someDate = new Date(89182743)
    const formattedDate = formatDate(someDate);
    expect(formattedDate).toEqual('01-01-1970 17:46:22');
  })

})