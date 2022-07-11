import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ProfileMenu from '@/components/ProfileMenu';

const TestComponent = () => (
  <AppProvider>
    <ProfileMenu />
  </AppProvider>
);

describe('Profile Menu Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('profile-menu');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})