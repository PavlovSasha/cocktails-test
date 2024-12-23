import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CocktailCard from '../components/CocktailCard/CocktailCard';
import { Cocktail } from '../types/cocktail';

const mockCocktail: Cocktail = {
  idDrink: '11007',
  strDrink: 'Margarita',
  strCategory: 'Ordinary Drink',
  strAlcoholic: 'Alcoholic',
  strGlass: 'Cocktail glass',
  strInstructions:
    'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
  strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
  strIngredient1: 'Tequila',
  strIngredient2: 'Triple sec',
  strIngredient3: 'Lime juice',
  strIngredient4: 'Salt',
  strIngredient5: null,
  strMeasure1: '1 1/2 oz',
  strMeasure2: '1/2 oz',
  strMeasure3: '1 oz',
  strMeasure4: null,
  strMeasure5: null,
};

describe('CocktailCard component', () => {
  it('renders cocktail details correctly', () => {
    render(<CocktailCard cocktail={mockCocktail} />);

    expect(screen.getByText(/Margarita/i)).toBeInTheDocument();
    expect(screen.getByText(/Ordinary Drink/i)).toBeInTheDocument();
    expect(screen.getByText(/Alcoholic/i)).toBeInTheDocument();
    expect(screen.getByText(/Cocktail glass/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Rub the rim of the glass with the lime slice to make the salt stick to it./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/List of ingredients:/i)).toBeInTheDocument();
    expect(screen.getByText(/Tequila/i)).toBeInTheDocument();
    expect(screen.getByText(/Triple sec/i)).toBeInTheDocument();
    expect(screen.getByText(/Lime juice/i)).toBeInTheDocument();
    expect(screen.queryByText('Salt')).toBeInTheDocument();
    expect(screen.getByText('1 1/2 oz')).toBeInTheDocument();
    expect(screen.getByText('1/2 oz')).toBeInTheDocument();
    expect(screen.getByText('1 oz')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Margarita/i })).toHaveAttribute(
      'src',
      'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    );
  });
});
