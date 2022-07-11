import { render, screen, waitFor } from '@testing-library/react';
import AppProvider from '@/providers/AppProvider';
import ColorDrawer from '@/components/ColorDrawer';

const TestComponent = () => (
  <AppProvider>
    <ColorDrawer
      manualOpen={true}
    />
  </AppProvider>
);

describe('Color Drawer Component Tests', () => {

  test('Should render component.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('color_drawer_container');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a color picker for primary one color.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('primary_one');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a color picker for primary two color.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('primary_two');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a color picker for secondary one color.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('secondary_one');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a color picker for secondary two color.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('secondary_two');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a color picker for secondary three color.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('secondary_three');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a transparency setter for background.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('background_opacity_setter');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a transparency setter for forms.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('form_opacity_setter');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a transparency setter for buttons.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('button_opacity_setter');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a transparency setter for button bar.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('button_bar_opacity_setter');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a transparency setter for title bar.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('title_bar_opacity_setter');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a transparency setter for drawer.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('drawer_opacity_setter');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a transparency setter for components.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('component_opacity_setter');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a button to close.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('color_drawer_close_button');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a button to set back to defaults', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('color_drawer_defaults_button');
      expect(element).toBeInTheDocument();
    })
  })

  test('Should have a button to apply color theme.', async () => {
    render(<TestComponent />)
    await waitFor(() => {
      const element = screen.getByTestId('color_drawer_apply_button');
      expect(element).toBeInTheDocument();
    })
  })

})