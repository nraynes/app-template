/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ErrorPage from '@/components/ErrorPage';

const TestComponent = () => (
  <AppProvider>
    <ErrorPage />
  </AppProvider>
);

describe('Error Page Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('error_page');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a message saying there was a problem', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const message = screen.getByText('Ooops, something went wrong :(');
      expect(message).toBeInTheDocument();
    });
  });

  test('Should have a button to allow the user to refresh the page.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const button = screen.getByTestId('error_page_button');
      expect(button.innerHTML).toContain('Refresh');
    });
  });

});