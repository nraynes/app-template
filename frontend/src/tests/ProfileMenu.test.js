/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import TopBar from '@/components/TopBar';

const TestComponent = () => (
  <AppProvider>
    <TopBar
      openDropDown={true}
    />
  </AppProvider>
);

describe('Profile Menu Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('profile-menu');
      expect(element).toBeInTheDocument();
    });
  });

});