import generateJoiError from "@/utils/formatters/generateJoiError";

/**
 * Processes a response from an api call and generates a snackbar output based on the message recieved.
 * @param {Object} response
 * @param {Object} o
 * @returns {Any}
 */
const processResponse = async (response, override) => {
  const enqueueSnackbar = window.enqueueSnackbar;

  const options = {
    ASYNCERROR: override.ASYNCERROR || 'The server could not process the request',
    NOTVALID: override.NOTVALID || 'Invalid request',
    NOTVERIFIED: override.NOTVERIFIED || 'You are not verified',
    RESTORED: override.RESTORED || 'Restored successfully',
    FAILURE: override.FAILURE || 'There was an issue while trying to process your request',
    CAPTCHAFAILED: override.CAPTCHAFAILED || 'Invalid captcha',
    NOTFOUND: override.NOTFOUND || 'That could not be found',
    FORBIDDEN: override.FORBIDDEN || 'That is forbidden',
    BANNED: override.BANNED || 'You are banned',
    ALREADYEXISTS: override.ALREADYEXISTS || 'That already exists',
    ERRPASS: override.ERRPASS || 'Wrong password',
    BADEMAIL: override.BADEMAIL || 'There was a problem with that email',
    CONFLICT: override.CONFLICT || 'There is a conflict with the data you provided',
    UNAUTHORIZED: override.UNAUTHORIZED || 'You are not authorized to perform that action',
    LOCKED: override.LOCKED || 'That action is not allowed',
    EXPIRED: override.EXPIRED || 'Expired',
    NOCAT: override.NOCAT || 'No category specified',
    TOOLARGE: override.TOOLARGE || 'The request/response was too large for the server to handle',
    SUCCESS: override.SUCCESS || 'Success!',
    NOCREDITS: override.NOCREDITS || 'The server ran out of email credits! Could not send email.',
  };

  const optionKeys = Object.keys(options);

  for (let i = 0;i < optionKeys.length;i++) {
    const curKey = `${optionKeys[i]}`;
    const curOpt = options[curKey];
    if (curOpt && response === curKey) {
      if (typeof curOpt === 'string') {
        enqueueSnackbar(curOpt, { variant: curKey === 'SUCCESS' ? 'success' : 'error' });
        return null;
      }
      return curOpt(response);
    }
  }
  if (response.details) {
    generateJoiError(response.details, enqueueSnackbar);
    return null;
  }
  if (options.SUCCESS && typeof options.SUCCESS === 'string') {
    enqueueSnackbar(options.SUCCESS, { variant: 'success' });
    return null;
  }
  if (options.SUCCESS) {
    return options.SUCCESS(response);
  }
  return null;
};

export default processResponse;