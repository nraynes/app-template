import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import InputAlert from '@/components/InputAlert';

const TestComponent = () => (
  <AppProvider>
    <InputAlert 
      title="The Title"
      message="Some message."
      open={true}
    />
  </AppProvider>
);

describe('Input Alert Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('alert_dialog');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a title.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByText('The Title');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a message.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByText('Some message.');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a text field.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('alert-dialog-input');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a cancel button.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByText('Cancel');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a submit button.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByText('Submit');
      expect(element).toBeInTheDocument();
    })
  })

})