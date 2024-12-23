import { describe, it, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Menu } from '../components/Menu';
import { CocktailCodes } from '../types/cocktail';

describe('Menu component', () => {
  it('renders menu items correctly', async () => {
    await act(async () =>
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Menu />} />
          </Routes>
        </MemoryRouter>,
      ),
    );

    Object.keys(CocktailCodes).forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });

  it('selects the correct default menu item', async () => {
    const [defaultLabel, defaultCode] = Object.entries(CocktailCodes)[1];

    await act(async () =>
      render(
        <MemoryRouter initialEntries={[`/${defaultCode}`]}>
          <Routes>
            <Route path="/:cocktailCode" element={<Menu />} />
          </Routes>
        </MemoryRouter>,
      ),
    );

    const selectedItem = screen.getByText(defaultLabel);
    expect(selectedItem.closest('.ant-menu-item-selected')).toBeTruthy();
  });
});
