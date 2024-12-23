export enum CocktailCodes {
  Margarita = 'margarita',
  Mojito = 'mojito',
  A1 = 'a1',
  Kir = 'kir',
}

export type Cocktail = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: `strIngredient${number}` | `strMeasure${number}`]: string | null;
};
