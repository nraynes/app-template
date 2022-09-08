/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import TopBar from '@/components/TopBar';

const TestComponent = () => (
  <AppProvider>
    <TopBar />
  </AppProvider>
);

describe('Top Bar Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('top-bar');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have title in top bar.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByText(/App Template/i);
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have button bar after rendering.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('top-bar-button-bar');
      expect(element).toBeInTheDocument();
    });
  });

});

