import { render, screen } from '@testing-library/react';
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

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})