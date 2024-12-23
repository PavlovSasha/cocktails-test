import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CocktailsList from '../components/CocktailsList/CocktailsList';
import cocktailsApi from '../services/cocktails';

const server = setupServer(
  http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('s');

    if (query === 'margarita') {
      return HttpResponse.json({
        drinks: [
          {
            idDrink: '11007',
            strDrink: 'Margarita',
            strCategory: 'Ordinary Drink',
            strAlcoholic: 'Alcoholic',
            strGlass: 'Cocktail glass',
            strInstructions:
              'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
            strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
          },
        ],
      });
    } else {
      return new HttpResponse(null, { status: 404 });
    }
  }),
);

const store = configureStore({
  reducer: {
    [cocktailsApi.reducerPath]: cocktailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cocktailsApi.middleware),
});

beforeEach(() => store.dispatch(cocktailsApi.util.resetApiState()));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CocktailsList component', () => {
  it('renders loading state initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/margarita']}>
          <Routes>
            <Route path="/:cocktailCode" element={<CocktailsList />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    server.use(
      http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/margarita']}>
          <Routes>
            <Route path="/:cocktailCode" element={<CocktailsList />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText(/Ошибка при загрузке/i)).toBeInTheDocument();
  });

  it('renders list of cocktails on successful fetch', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/margarita']}>
          <Routes>
            <Route path="/:cocktailCode" element={<CocktailsList />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText(/Margarita/i)).toBeInTheDocument();
  });
});
