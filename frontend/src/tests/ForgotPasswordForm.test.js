import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ForgotPasswordForm from '@/features/forgotPassword/components/ForgotPasswordForm';

const TestComponent = () => (
  <AppProvider>
    <ForgotPasswordForm />
  </AppProvider>
);

describe('Forgot Password Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('forgot-password');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})