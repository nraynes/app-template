/* eslint-disable react/react-in-jsx-scope */
import AppProvider from './providers/AppProvider';
import AppRoutes from './routes';
import ReactGA from 'react-ga';
import { gaid } from './config/config';

function App() {
  ReactGA.initialize(gaid);
  
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
