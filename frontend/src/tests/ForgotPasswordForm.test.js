import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ForgotPasswordForm from '@/features/forgotPassword/components/ForgotPasswordForm';

const TestComponent = () => (
  <AppProvider>
    <ForgotPasswordForm />
  </AppProvider>
);

describe('Forgot Password Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('forgot-password');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have an email label.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('forgot-password-email-label');
      expect(element).toBeInTheDocument();
    })
  })
  
  test('Should have an email text field.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('forgot-password-email-input');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a back button.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('forgot-password-form-back-button');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a submit button.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('forgot-password-form-reset-password-button');
      expect(element).toBeInTheDocument();
    })
  })

})