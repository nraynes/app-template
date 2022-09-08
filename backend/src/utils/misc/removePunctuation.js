/**
 * Checks to see if a character is either a lowercase letter, uppercase letter, number, or a space.
 * Does so without using regex for speed.
 * @param {String} char
 * @returns {Booleans}
 */
const checkASCII = (char) => {
  const code = char.charCodeAt(0);
  return (
    (code >= 97 && code <= 122) // Lowercase alphabet
    || (code >= 65 && code <= 90) // Uppercase alphabet
    || (code >= 48 && code <= 57) // Numbers
    || code === 32 // Space
  );
};

/**
 * Removes all punctuation from a given string.
 * @param {String} text
 * @param {Boolean} replaceWithSpace
 * @returns {String}
 */
const removePunctuationFromText = (text, replaceWithSpace = false) => {
  let retVal = '';
  for (let i = 0;i < text.length;i++) {
    const curChar = text[i];
    if (checkASCII(curChar)) {
      retVal += curChar;
    } else if (replaceWithSpace) {
      retVal += ' ';
    }
  }
  return retVal;
};

module.exports = removePunctuationFromText;