/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import FileDialogue from '@/components/FileDialogue';

const TestComponent = () => (
  <AppProvider>
    <FileDialogue 
      title="The Title"
      message="Some message."
      open={true}
    />
  </AppProvider>
);

describe('File Dialogue Component Tests', () => {

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
      const element = screen.getByTestId('alert-dialog-title');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a message.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('alert-dialog-description');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a file picker.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('fileinput');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a cancel button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('alert-dialog-cancel');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a submit button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('alert-dialog-submit');
      expect(element).toBeInTheDocument();
    });
  });

});