import processResponse from './processResponse';

const apiCall = async (requestCallback, responseOptions, showLoadingIcon = true) => {
  const { nowAwaiting, notAwaiting } = window;
  if (showLoadingIcon) nowAwaiting();
  const response = await requestCallback();
  if (showLoadingIcon) notAwaiting();
  return await processResponse(response, responseOptions)
};

export default apiCall;