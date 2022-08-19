const badWordList = require('./BadWordLists/index');
const knownGoodWords = require('./knownGoodWords');
const removePuncuationFromText = require('./removePunctuation');

const replacePuncuationWithLetter = (text) => {
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

const checkForDirectMatchesWithoutPuncuation = (textClone) => {
  if (badWordList.some((badWord) => textClone.split(' ').some((wordInText) => wordInText === badWord))) {
    return true;
  }
  return false;
}
const checkForDirectMatchesWithPuncuationReplacedBySpaces = (textClone) => {
  if (badWordList.some((badWord) => textClone.split(' ').some((wordInText) => wordInText === badWord))) {
    return true;
  }
  return false;
}

const checkForIndirectMatchesWithoutPuncuation = (textClone) => {
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

const checkForDirectMatchesWithReplacedPuncuation = (textClone) => {
  if (badWordList.some((badWord) => textClone.split(' ').some((wordInText) => wordInText === badWord))) {
    return true;
  }
  return false;
}

const checkForIndirectMatchesWithReplacedPuncuation = (textClone) => {
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

// Function to check a string for inappropriate language.
const cleanText = (text) => {
  text = text.toLowerCase().replaceAll('\\', '');
  const textWithoutPuncuation = removePuncuationFromText(text);
  const textWithPuncuationReplacedBySpaces = removePuncuationFromText(text, true);
  const textWithReplacedPuncuation = replacePuncuationWithLetter(text);
  if (
    checkForDirectMatchesWithoutPuncuation(textWithoutPuncuation)
    || checkForDirectMatchesWithPuncuationReplacedBySpaces(textWithPuncuationReplacedBySpaces)
    || checkForDirectMatchesWithReplacedPuncuation(textWithReplacedPuncuation)
    || checkForIndirectMatchesWithoutPuncuation(textWithoutPuncuation)
    || checkForIndirectMatchesWithReplacedPuncuation(textWithReplacedPuncuation)
  ) {
    return false;
  }
  return true;
};

module.exports = cleanText;