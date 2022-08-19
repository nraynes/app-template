/* eslint-disable max-len */
/* eslint-disable no-console */
const log = require('@/utils/misc/log');
/**
 * Send a server response with a predetermined error code json or a return object.
 * Respond does not terminate execution.
 * @param {Object} res
 * @param {Object} resObj
 * @returns {String}
 */
function respond(res, resObj, statusOveride = 200) {
  res.status(statusOveride);
  if (typeof resObj === 'object') {
    const resObjKeys = Object.keys(resObj);
    if (resObjKeys.length === 2) {
      if (resObjKeys[0] === 'message' && resObjKeys[1] === 'status') {
        res.status(resObj.status);
        res.json(resObj.message);
        log(`Responded to client request with status code ${resObj.status} and message code ${resObj.message}.`);
        return 'SENTCODE';
      }
    }
    res.send(resObj);
    log(`Responded to client request with status code ${statusOveride} and response object.`, resObj);
    return 'SENTOBJECT';
  }
  res.json(resObj);
  log(`Responded to client request with status code ${statusOveride} and a JSON response.`, resObj);
  return 'SENTJSON';
}

module.exports = respond;
