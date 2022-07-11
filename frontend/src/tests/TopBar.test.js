import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import TopBar from '@/components/TopBar';

const TestComponent = () => (
  <AppProvider>
    <TopBar />
  </AppProvider>
);

describe('Top Bar Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('top-bar');
      expect(element).toBeInTheDocument();
    }, 20)
  })

  test('Should have title in top bar.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByText(/App Template/i);
      expect(element).toBeInTheDocument();
    }, 20)
  })

  test('Should have button bar after rendering.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('top-bar-button-bar')
      expect(element).toBeInTheDocument();
    }, 20)
  })

})

