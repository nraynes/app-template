import ReactGA from 'react-ga';

export const gaEventHandler = (category='UndefinedCategory') => {
  if (process.env.NODE_ENV === 'production') {
    const eventTracker = (action = 'UndefinedAction', label = 'UndefinedLabel') => {
      if (process.env.NODE_ENV == 'development') {
        console.log(`Tracked an event with category: ${category}, action: ${action}, and label: ${label}.`);
      }
      ReactGA.event({category, action, label});
    };
    return eventTracker;
  } else {
    return (x, y) => (x + y);
  }
};

export const gaPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    const pageURL = window.location.pathname + (window.location.search || '');
    if (process.env.NODE_ENV == 'development') {
      console.log(`Tracked a pageview at ${pageURL}`);
    }
    ReactGA.pageview(pageURL);
  }
};

export const gaException = (description = 'UndefinedDescription', fatal = false) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.exception({
      description,
      fatal,
    });
  }
};
