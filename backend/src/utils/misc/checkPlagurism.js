const removePuncuationFromText = require('./removePunctuation');

/**
 * Checks if a users text matches up to 60 percent of a published text, or returns the percentage.
 * @param {String} usersText
 * @param {String} publishedText
 * @param {Boolean} returnPercentage
 * @returns {Boolean || Number}
 */
const checkPlagurism = (usersText, publishedText, returnPercentage = false) => {
  const wordArrOne = removePuncuationFromText(usersText).split(' ').filter((item) => item && item);
  const wordArrTwo = removePuncuationFromText(publishedText).split(' ').filter((item) => item && item);
  let bigArr, smallArr;
  if (wordArrOne.length > wordArrTwo.length) {
    bigArr = wordArrOne;
    smallArr = wordArrTwo;
  } else {
    bigArr = wordArrTwo;
    smallArr = wordArrOne;
  }
  bigArr = bigArr.sort();
  smallArr = smallArr.sort();
  let j = 0;
  let wordsMatched = 0;
  const threshold = wordArrTwo.length * 0.6;
  for (let i = 0; i < bigArr.length; i++) {
    if (bigArr[i] === smallArr[j]) {
      wordsMatched++;
      if (!returnPercentage && wordsMatched >= threshold) return true // If the users text matches to at least the threshold that was set early, it will exit the function early to save time.
      if (i > j) i = j-1;
      j++;
    } else if (i >= bigArr.length-1) {
      i = j-1;
      j++;
    }
  }
  if (returnPercentage) {
    return (wordsMatched / wordArrTwo.length) * 100;
  }
  return false;
}

module.exports = checkPlagurism;