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
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('signup-form');
      expect(element).toBeInTheDocument();
    })
  })

})