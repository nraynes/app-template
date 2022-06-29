import generateJoiError from "@/utils/formatters/generateJoiError";

const processResponse = async (response, o) => {
  const enqueueSnackbar = window.enqueueSnackbar;

  const options = {
    ASYNCERROR: o.ASYNCERROR || 'The server could not process the request',
    NOTVALID: o.NOTVALID || 'Invalid request',
    NOTVERIFIED: o.NOTVERIFIED || 'You are not verified',
    RESTORED: o.RESTORED || 'Restored successfully',
    FAILURE: o.FAILURE || 'There was an issue while trying to process your request',
    CAPTCHAFAILED: o.CAPTCHAFAILED || 'Invalid captcha',
    NOTFOUND: o.NOTFOUND || 'That could not be found',
    FORBIDDEN: o.FORBIDDEN || 'That is forbidden',
    BANNED: o.BANNED || 'You are banned',
    ALREADYEXISTS: o.ALREADYEXISTS || 'That already exists',
    ERRPASS: o.ERRPASS || 'Wrong password',
    BADEMAIL: o.BADEMAIL || 'There was a problem with that email',
    CONFLICT: o.CONFLICT || 'There is a conflict with the data you provided',
    UNAUTHORIZED: o.UNAUTHORIZED || 'You are not authorized to perform that action',
    LOCKED: o.LOCKED || 'That action is not allowed',
    EXPIRED: o.EXPIRED || 'Expired',
    NOCAT: o.NOCAT || 'No category specified',
    TOOLARGE: o.TOOLARGE || 'The request/response was too large for the server to handle',
    SUCCESS: o.SUCCESS || 'Success!',
    NOCREDITS: o.NOCREDITS || 'The server ran out of email credits! Could not send email.',
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