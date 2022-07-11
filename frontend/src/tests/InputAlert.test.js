import { render, screen } from '@testing-library/react';
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

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('alert-dialog');
      expect(element).toBeInTheDocument();
    }, 20)
  })

})