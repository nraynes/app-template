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

})