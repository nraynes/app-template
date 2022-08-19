/* eslint-disable jest/no-conditional-expect */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import Picture from '@/components/Picture';
import testPicture from './picture';
import { useProfilePhoto } from '@/config/config';

const TestComponent = () => (
  <AppProvider>
    <Picture src={testPicture} />
  </AppProvider>
);

describe('Awaiting Component Tests', () => {

  test('Should render component backdrop.', async () => {
    if (useProfilePhoto) {
      render(<TestComponent />)
      await waitFor(() => {
        const element = screen.getByRole('img');
        expect(element).toBeInTheDocument();
      })
    }
  })

})