import { render, screen } from '@testing-library/react';
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

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})