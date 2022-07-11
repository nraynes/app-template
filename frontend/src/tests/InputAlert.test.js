import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import InputAlert from '@/components/InputAlert';

const TestComponent = () => (
  <AppProvider>
    <InputAlert 
      title="The Title"
      message="Some message."
      open={true}
    />
  </AppProvider>
);

describe('Input Alert Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('alert_dialog');
      expect(element).toBeInTheDocument();
    })
  })

})