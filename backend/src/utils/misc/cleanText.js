const badWordList = require('./BadWordLists/index');
const knownGoodWords = require('./knownGoodWords');
const removePunctuationFromText = require('./removePunctuation');

/**
 * Replaces all punctuation with their respective letter in a given string.
 * @param {String} text
 * @returns {String}
 */
const replacePunctuationWithLetter = (text) => {
  const matrix = {
    a: ['@'],
    b: ['6'],
    c: ['<', '(', '[', '{'],
    d: ['>', ')', ']', '}'],
    e: ['=', '3'],
    i: ['|', '1'],
    l: ['/'],
    o: ['0'],
    q: ['9'],
    s: ['$', '5'],
    z: ['2'],
  }
  let retVal = '';
  for (let i = 0; i < text.length; i++) {
    const curCharacter = text[i];
    let addCharacter = curCharacter;
    const letters = Object.keys(matrix);
    for (let j = 0; j < letters.length; j++) {
      const curLetter = letters[j];
      const values = matrix[curLetter];
      for (let k = 0; k < values.length; k++) {
        const curSpecial = values[k]
        if (curSpecial === curCharacter) {
          addCharacter = curLetter;
        }
      } 
    }
    retVal += addCharacter;
  }
  return retVal;
}

/**
 * Checks to see if a given string has any direct bad words in it.
 * @param {String} textClone
 * @returns {Boolean}
 */
const checkForDirectMatches = (textClone) => {
  if (badWordList.some((badWord) => textClone.split(' ').some((wordInText) => wordInText === badWord))) {
    return true;
  }
  return false;
}

/**
 * Checks to see if a given string has any indirect bad words in it,
 * while not flagging good words that contain the spelling of a bad word.
 * @param {String} textClone
 * @returns {Boolean}
 */
const checkForIndirectMatches = (textClone) => {
  if (badWordList.some((badWord) => textClone.split(' ').some((wordInText) => {
    const wordMatched = wordInText.match(badWord);
    if (wordMatched) {
      const falseAlarm = knownGoodWords.some((goodWord) => wordInText.match(goodWord));
      if (falseAlarm) {
        return false;
      }
      return true;
    }
    return false;
  }))) {
    return true;
  }
  return false;
}

/**
 * Checks a string for inappropriate language.
 * @param {String} text
 * @returns {Object}
 */

const cleanText = (text) => {
  text = text.toLowerCase().replaceAll('\\', '');
  const textWithoutPunctuation = removePunctuationFromText(text);
  const textWithPunctuationReplacedBySpaces = removePunctuationFromText(text, true);
  const textWithReplacedPunctuation = replacePunctuationWithLetter(text);
  if (
    checkForDirectMatches(textWithoutPunctuation)
    || checkForDirectMatches(textWithPunctuationReplacedBySpaces)
    || checkForDirectMatches(textWithReplacedPunctuation)
    || checkForIndirectMatches(textWithoutPunctuation)
    || checkForIndirectMatches(textWithReplacedPunctuation)
  ) {
    return false;
  }
  return true;
};

module.exports = cleanText;