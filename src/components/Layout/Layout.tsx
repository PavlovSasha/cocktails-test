import { Layout as AntLayout } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Menu } from '../Menu';
import cl from './layout.module.scss';
import { CocktailCodes } from '../../types/cocktail';
import { CocktailsList } from '../CocktailsList';

const { Content, Sider } = AntLayout;

const Layout = () => {
  const { cocktailCode } = useParams();
  const navigate = useNavigate();

  const cocktailIsExist = (Object.values(CocktailCodes) as string[]).includes(cocktailCode!);

  useEffect(() => {
    if (!cocktailIsExist) {
      navigate('/404');
    }
  }, [cocktailIsExist, navigate]);

  if (!cocktailIsExist) {
    return null;
  }

  return (
    <AntLayout className={cl.layout}>
      <Sider className={cl.sider} breakpoint="sm" collapsedWidth={0}>
        <Menu />
      </Sider>
      <Content className={cl.content}>
        <CocktailsList />
      </Content>
    </AntLayout>
  );
};

export default Layout;
