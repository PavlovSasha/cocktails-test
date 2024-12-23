import { Typography } from 'antd';
import { useParams } from 'react-router';

import { useGetCocktailsQuery } from '../../services/cocktails';
import { CocktailCard } from '../CocktailCard';

const { Paragraph } = Typography;

const CocktailsList = () => {
  const { cocktailCode } = useParams();
  const { data, error, isLoading } = useGetCocktailsQuery(cocktailCode ?? '');

  if (isLoading) {
    return <Paragraph>Загрузка...</Paragraph>;
  }

  if (error) {
    return <Paragraph>Ошибка при загрузке</Paragraph>;
  }

  return data?.drinks.map((cocktail) => <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />);
};

export default CocktailsList;
