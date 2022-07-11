import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ChangePasswordForm from '@/features/forgotPassword/components/ChangePasswordForm';

const TestComponent = () => (
  <AppProvider>
    <ChangePasswordForm />
  </AppProvider>
);

describe('Change Password Form Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('change-password');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})