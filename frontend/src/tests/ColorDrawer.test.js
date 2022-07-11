import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ColorDrawer from '@/components/ColorDrawer';

const TestComponent = () => (
  <AppProvider>
    <ColorDrawer />
  </AppProvider>
);

describe('Color Drawer Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('color_drawer_container');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})