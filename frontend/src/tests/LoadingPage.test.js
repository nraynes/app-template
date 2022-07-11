import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import LoadingPage from '@/components/LoadingPage';

const TestComponent = () => (
  <AppProvider>
    <LoadingPage />
  </AppProvider>
);

describe('Loading Page Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('loading-page');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a circular progress component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('loading-progress');
      expect(element).toBeInTheDocument();
    })
  })

})