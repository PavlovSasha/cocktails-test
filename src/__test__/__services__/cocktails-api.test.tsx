import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useGetCocktailsQuery } from '../../services/cocktails';
import cocktailsApi from '../../services/cocktails';

const server = setupServer(
  http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', () => {
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
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('cocktailsApi', () => {
  it('fetches cocktails based on search query', async () => {
    const store = configureStore({
      reducer: {
        [cocktailsApi.reducerPath]: cocktailsApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cocktailsApi.middleware),
    });

    const { result } = renderHook(() => useGetCocktailsQuery('margarita'), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
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
  });
});
