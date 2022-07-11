import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ProfileEditor from '@/features/profile/components/ProfileEditor';

const TestComponent = () => (
  <AppProvider>
    <ProfileEditor />
  </AppProvider>
);

describe('Profile Editor Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-editor');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have an email label.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-editor-email-label');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have an email text field.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-editor-email-input');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a delete account button.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-editor-form-delete-account-button');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a log out of all devices button.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-editor-form-log-out-all-button');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have an edit button.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('profile-editor-form-edit-submit-button');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a cancel button when editing.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      screen.getByTestId('profile-editor-form-edit-submit-button').click();
      const element = screen.getByTestId('profile-editor-form-cancel-button');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a submit button when editing.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      screen.getByTestId('profile-editor-form-edit-submit-button').click();
      const element = screen.getByText('Submit');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have an editable text field when editing.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      screen.getByTestId('profile-editor-form-edit-submit-button').click();
      const element = screen.getByTestId('profile-editor-email-input-editing');
      expect(element).toBeInTheDocument();
    })
  })

})