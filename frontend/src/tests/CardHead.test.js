import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import CardHead from '@/components/CardHead';

const TestComponent = () => (
  <AppProvider>
    <CardHead
      id="test-component"
      data-testid="test-component"
    />
  </AppProvider>
);

describe('Card Head Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})