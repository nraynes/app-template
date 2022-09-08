/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import Card from '@/components/Card';

const TestComponent = () => (
  <AppProvider>
    <Card
      id="test-component"
      data-testid="test-component"
    />
  </AppProvider>
);

describe('Card Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    });
  });

});