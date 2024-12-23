import { describe, expect, beforeEach, it } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import App from '../App';
import store from '../app/store';

describe('App component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('redirects to Margarita on root path', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>,
      ),
    );

    expect(screen.getByText(/Margarita/i)).toBeInTheDocument();
  });

  it('renders NotFound component for invalid route', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/unknown']}>
            <App />
          </MemoryRouter>
        </Provider>,
      ),
    );

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
