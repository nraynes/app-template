import { render, screen } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import AskAlert from '@/components/AskAlert';

const TestComponent = () => (
  <AppProvider>
    <AskAlert
      title="The Title"
      message="Some message."
      open={true}
    />
  </AppProvider>
);

describe('Ask Alert Component Tests', () => {

  test('Should renders component within 20 milliseconds.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const element = screen.getByTestId('alert-dialog');
      expect(element).toBeInTheDocument();
    }, 20)
  })

  test('Should have a title, message, and yes and no buttons.', () => {
    render(<TestComponent />)
    setTimeout(() => {
      const elementTitle = screen.getByText('The Title');
      const elementMessage = screen.getByText('Some message.');
      const elementYes = screen.getByText('Yes');
      const elementNo = screen.getByText('No');
      expect(elementTitle).toBeInTheDocument();
      expect(elementMessage).toBeInTheDocument();
      expect(elementYes).toBeInTheDocument();
      expect(elementNo).toBeInTheDocument();
    }, 20)
  })

})