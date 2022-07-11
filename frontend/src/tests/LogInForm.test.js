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
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('login-form');
      expect(element).toBeInTheDocument();
    })
  })

})