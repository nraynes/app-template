/**
 * Checks a string to see if it contains any links.
 * @param {String} text
 * @returns {Boolean}
 */
const checkForLinks = (text) => {
  if (text.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/) || text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
    return true;
  }
  return false;
}

module.exports = checkForLinks;