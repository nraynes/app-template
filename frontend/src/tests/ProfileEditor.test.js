import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ProfileEditor from '@/features/profile/components/ProfileEditor';

const TestComponent = () => (
  <AppProvider>
    <ProfileEditor />
  </AppProvider>
);

describe('Profile Editor Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('profile-editor');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})