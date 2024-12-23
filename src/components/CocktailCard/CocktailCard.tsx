import { Typography, Flex } from 'antd';
import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Cocktail } from '../../types/cocktail';
import cl from './cocktailCard.module.scss';

const { Title, Paragraph, Text } = Typography;

type CocktailCardProps = {
  cocktail: Cocktail;
};

const CocktailCard: FC<CocktailCardProps> = ({ cocktail }) => {
  return (
    <Flex align="start" gap={16} style={{ marginBottom: 80 }} className={cl.card}>
      <Flex vertical flex={1}>
        <Title level={3}>{cocktail.strDrink}</Title>
        <Paragraph>{cocktail.strCategory}</Paragraph>
        <Paragraph>{cocktail.strAlcoholic}</Paragraph>
        <Paragraph>{cocktail.strGlass}</Paragraph>
        <Title level={5} style={{ marginTop: 16 }}>
          Instructions:
        </Title>
        <Paragraph>{cocktail.strInstructions}</Paragraph>
        <Title level={5} style={{ marginTop: 16 }}>
          List of ingredients:
        </Title>
        {Object.keys(cocktail)
          .filter((key) => key.startsWith('strIngredient') && cocktail[key as keyof Cocktail])
          .map((key) => (
            <Flex key={key} gap={8} wrap="nowrap">
              <Text type="secondary" style={{ flexBasis: 80, flexShrink: 0 }}>
                {cocktail[`strMeasure${key.replace('strIngredient', '')}` as keyof Cocktail]}
              </Text>
              <Text>{cocktail[key as keyof Cocktail]}</Text>
            </Flex>
          ))}
      </Flex>
      <LazyLoadImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className={cl.image} />
    </Flex>
  );
};

export default CocktailCard;
