import processResponse from './processResponse';

const apiCall = async (requestCallback, responseOptions) => {
  const { nowAwaiting, notAwaiting } = window;
  nowAwaiting();
  const response = await requestCallback();
  notAwaiting();
  return await processResponse(response, responseOptions)
};

export default apiCall;