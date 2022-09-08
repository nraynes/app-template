/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ChangePasswordForm from '@/features/forgotPassword/components/ChangePasswordForm';

const TestComponent = () => (
  <AppProvider>
    <ChangePasswordForm />
  </AppProvider>
);

describe('Change Password Form Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('change-password');
      expect(element).toBeInTheDocument();
    });
  });
  
  test('Should have a password label.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('change-password-password-label');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a password text field.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('change-password-password-input');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a confirm password label.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('change-password-confirm-password-label');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a confirm password text field.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('change-password-confirm-password-input');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a cancel button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('change-password-form-cancel-button');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a submit button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('change-password-form-change-password-button');
      expect(element).toBeInTheDocument();
    });
  });

});