import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import LoadingPage from '@/components/LoadingPage';

const TestComponent = () => (
  <AppProvider>
    <LoadingPage />
  </AppProvider>
);

describe('Loading Page Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('loading-page');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})