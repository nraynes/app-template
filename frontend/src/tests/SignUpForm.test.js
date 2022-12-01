/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import SignUpForm from '@/features/auth/components/SignUpForm';

const TestComponent = () => (
  <AppProvider>
    <SignUpForm />
  </AppProvider>
);

describe('Sign Up Form Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-form');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an email label.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-email-label');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an email text field.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-email-input');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an password label.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-password-label');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an password text field.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-password-input');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an confirm password label.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-confirm-password-label');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an confirm password text field.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-confirm-password-input');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have an captcha component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('google-recaptcha');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a log in button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-form-login-button');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a sign up button.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('signup-form-signup-button');
      expect(element).toBeInTheDocument();
    });
  });

});