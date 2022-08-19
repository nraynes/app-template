const checkASCII = (char) => {
  const code = char.charCodeAt(0)
  return (
    (code >= 97 && code <= 122) // Lowercase alphabet
    || (code >= 65 && code <= 90) // Uppercase alphabet
    || (code >= 48 && code <= 57) // Numbers
    || code === 32 // Space
  );
}

// This function is around half the speed of the one below and has a linear time complexity.
// however it is 100% accurate in removing all puncuation.
const removePuncuationFromText = (text, replaceWithSpace = false) => {
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
}


// This function is twice as fast and has a more constant time complexity
// however is less accurate and will only remove puncuation that is defined in the array.
// \/
// const removePuncuationFromText = (text, replaceWithSpace = false) => {
//   const punc = ['!', '.',',','?','"',"'",'+','=','-','_',';',':','>','<','/','\\','|','@','#','$','%','^','&','*','(',')',']','[','{','}','~','`'];
// 	let retVal = text;
//   for (let i = 0;i < punc.length;i++) {
//     retVal = retVal.replaceAll(punc[i], replaceWithSpace ? ' ' : '');
//   }
//   return retVal;
// }

module.exports = removePuncuationFromText;