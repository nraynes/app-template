import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import Awaiting from '@/components/Awaiting';

const TestComponent = () => (
  <AppProvider>
    <Awaiting
      open
    />
  </AppProvider>
);

describe('Awaiting Component Tests', () => {

  test('Should render component backdrop.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const elementBackdrop = screen.getByTestId('waiting_backdrop');
      expect(elementBackdrop).toBeInTheDocument();
    })
  })

  test('Should render circular progress component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const elementProgress = screen.getByTestId('waiting_progress');
      expect(elementProgress).toBeInTheDocument();
    })
  })

})