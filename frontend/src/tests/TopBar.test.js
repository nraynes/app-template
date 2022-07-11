import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import TopBar from '@/components/TopBar';

const TestComponent = () => (
  <AppProvider>
    <TopBar />
  </AppProvider>
);

describe('Top Bar Component Tests', () => {

  test('Renders top bar within 1 second.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const linkElement = screen.getByText(/App Template/i);
      expect(linkElement).toBeInTheDocument();
    }, 1000)
  })

})

