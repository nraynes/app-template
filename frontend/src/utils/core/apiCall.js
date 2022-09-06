import processResponse from './processResponse';

/**
 * Performs an API call using the acquire function and handles the response using processResponse.
 * @param {Function} requestCallback
 * @param {Object} responseOptions
 * @param {Boolean} showLoadingIcon
 * @returns {Object}
 */
const apiCall = async (requestCallback, responseOptions, showLoadingIcon = true) => {
  const { nowAwaiting, notAwaiting } = window;
  if (showLoadingIcon) nowAwaiting();
  const response = await requestCallback();
  if (showLoadingIcon) notAwaiting();
  return await processResponse(response, responseOptions)
};

export default apiCall;