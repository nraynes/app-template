import { render, screen, waitFor } from '@testing-library/react';
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

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('test-component');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a label.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('test-component_label');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a slider.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('test-component_slider');
      expect(element).toBeInTheDocument();
    })
  })

})