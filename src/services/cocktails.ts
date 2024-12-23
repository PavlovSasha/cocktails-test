import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cocktail } from '../types/cocktail';

const cocktailsApi = createApi({
  reducerPath: 'cocktailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1' }),
  endpoints: (builder) => ({
    getCocktails: builder.query<{ drinks: Cocktail[] }, string>({
      query: (code) => `search.php?s=${code}`,
      keepUnusedDataFor: Infinity,
    }),
  }),
});

export const { useGetCocktailsQuery } = cocktailsApi;

export default cocktailsApi;
