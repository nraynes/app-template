/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import LogInForm from '@/features/auth/components/LogInForm';

const TestComponent = () => (
  <AppProvider>
    <LogInForm />
  </AppProvider>
);

describe('Log In Form Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-form');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an email label.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-email-label');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an email text field.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-email-input');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an password label.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-password-label');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an password text field.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-password-input');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a forgot password button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-form-forgot-password-button');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a sign up button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-form-signup-button');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a log in button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('login-form-login-button');
      expect(element).toBeInTheDocument();
    });
  });

});