import { act, cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, vi, it, afterEach, expect } from 'vitest';
import { Layout } from '../components/Layout';
import { CocktailCodes } from '../types/cocktail';
import { Provider } from 'react-redux';
import store from '../app/store';

const mockNavigate = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Layout component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders Layout when cocktailCode is valid', async () => {
    const validCode = Object.values(CocktailCodes)[0];

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[`/${validCode}`]}>
            <Routes>
              <Route path="/:cocktailCode" element={<Layout />} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });

    Object.keys(CocktailCodes).forEach((code) => {
      expect(screen.getByText(code)).toBeInTheDocument();
    });
  });

  it('redirects to NotFound for invalid cocktail code', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/invalid-code']}>
            <Routes>
              <Route path="/:cocktailCode" element={<Layout />} />
              <Route path="/404" element={<div>Page not found</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });

  it('does not render Content when cocktailCode is invalid', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/invalid-code']}>
            <Routes>
              <Route path="/:cocktailCode" element={<Layout />} />
              <Route path="/404" element={<div>Page not found</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });

    expect(screen.queryByText(/A1/i)).not.toBeInTheDocument();
  });
});
