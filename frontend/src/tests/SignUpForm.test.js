import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import SignUpForm from '@/features/auth/components/SignUpForm';

const TestComponent = () => (
  <AppProvider>
    <SignUpForm />
  </AppProvider>
);

describe('Sign Up Form Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('signup-form');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})