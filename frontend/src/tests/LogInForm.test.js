import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import LogInForm from '@/features/auth/components/LogInForm';

const TestComponent = () => (
  <AppProvider>
    <LogInForm />
  </AppProvider>
);

describe('Log In Form Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('login-form');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})