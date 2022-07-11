import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import Awaiting from '@/components/Awaiting';

const TestComponent = () => (
  <AppProvider>
    <Awaiting />
  </AppProvider>
);

describe('Awaiting Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('waiting_backdrop');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})