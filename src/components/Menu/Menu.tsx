import { NavLink, useParams } from 'react-router';
import { Menu as AntMenu } from 'antd';

import { CocktailCodes } from '../../types/cocktail';

const items = Object.entries(CocktailCodes).map(([key, value]) => ({
  key: value,
  label: (
    <NavLink key={key} to={`/${value}`}>
      {key}
    </NavLink>
  ),
}));

const Menu = () => {
  const { cocktailCode = '' } = useParams();

  return <AntMenu items={items} mode="inline" defaultSelectedKeys={[cocktailCode]} />;
};

export default Menu;
