/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import CardHead from '@/components/CardHead';

const TestComponent = () => (
  <AppProvider>
    <CardHead
      id="test-component"
      data-testid="test-component"
    >Test Content</CardHead>
  </AppProvider>
);

describe('Card Head Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    });
  });

  test('Should have a title header.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const title = screen.getByText('Test Content');
      expect(title).toBeInTheDocument();
    });
  });

});