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

})