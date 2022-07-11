import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ProfileEditor from '@/features/profile/components/ProfileEditor';

const TestComponent = () => (
  <AppProvider>
    <ProfileEditor />
  </AppProvider>
);

describe('Profile Editor Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-editor');
      expect(element).toBeInTheDocument();
    })
  })

})