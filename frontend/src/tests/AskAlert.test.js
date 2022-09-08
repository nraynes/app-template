/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import AskAlert from '@/components/AskAlert';

const TestComponent = () => (
  <AppProvider>
    <AskAlert
      title="The Title"
      message="Some message."
      open={true}
    />
  </AppProvider>
);

describe('Ask Alert Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('alert-dialog');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a title.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const elementTitle = screen.getByText('The Title');
      expect(elementTitle).toBeInTheDocument();
    });
  });

  test('Should have a message.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const elementMessage = screen.getByText('Some message.');
      expect(elementMessage).toBeInTheDocument();
    });
  });

  test('Should have a yes button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const elementYes = screen.getByText('Yes');
      expect(elementYes).toBeInTheDocument();
    });
  });

  test('Should have a no button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const elementNo = screen.getByText('No');
      expect(elementNo).toBeInTheDocument();
    });
  });

});