import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ErrorPage from '@/components/ErrorPage';

const TestComponent = () => (
  <AppProvider>
    <ErrorPage />
  </AppProvider>
);

describe('Error Page Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('error_page');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})