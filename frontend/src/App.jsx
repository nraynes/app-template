/* eslint-disable react/react-in-jsx-scope */
import AppProvider from './providers/AppProvider';
import AppRoutes from './routes';
import ReactGA from 'react-ga';
import { gaid } from './config/config';

ReactGA.initialize(gaid);

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
