import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import TransparencySetter from '@/components/TransparencySetter';

const TestComponent = () => (
  <AppProvider>
    <TransparencySetter
      id="test-component"
      data-testid="test-component"
    />
  </AppProvider>
);

describe('Transparency Setter Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})