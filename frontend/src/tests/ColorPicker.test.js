/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ColorPicker from '@/components/ColorPicker';

const TestComponent = () => (
  <AppProvider>
    <ColorPicker
      id="test-component"
      data-testid="test-component"
    />
  </AppProvider>
);

describe('Color Picker Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    });
  });

});