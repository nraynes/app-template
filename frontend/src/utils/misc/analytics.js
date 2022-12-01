import ReactGA from 'react-ga';
import { gaid } from '@/config/config';

ReactGA.initialize(gaid);

export const gaEventHandler = (category='UndefinedCategory') => {
  const eventTracker = (action = 'UndefinedAction', label = 'UndefinedLabel') => {
    if (process.env.NODE_ENV == 'development') {
      console.log(`Tracked an event with category: ${category}, action: ${action}, and label: ${label}.`);
    }
    ReactGA.event({category, action, label});
  };
  return eventTracker;
};

export const gaPageView = () => {
  const pageURL = window.location.pathname + (window.location.search || '');
  if (process.env.NODE_ENV == 'development') {
    console.log(`Tracked a pageview at ${pageURL}`);
  }
  ReactGA.pageview(pageURL);
};