import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ProfileMenu from '@/components/ProfileMenu';

const TestComponent = () => (
  <AppProvider>
    <ProfileMenu
      menuOpen={true}
    />
  </AppProvider>
);

describe('Profile Menu Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-menu');
      expect(element).toBeInTheDocument();
    })
  })

})