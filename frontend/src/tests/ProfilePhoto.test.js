/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ProfilePhoto from '@/components/ProfilePhoto';
import testPicture from './picture';
import { useProfilePhoto } from '@/config/config';

const TestComponent = () => (
  <AppProvider>
    <ProfilePhoto id="test-component" photo={testPicture} />
  </AppProvider>
);

describe('Awaiting Component Tests', () => {

  test('Should render component backdrop.', async () => {
    if (useProfilePhoto) {
      render(<TestComponent />);
      await waitFor(() => {
        const element = screen.getByTestId('test-component');
        expect(element).toBeInTheDocument();
      });
    }
  });

});