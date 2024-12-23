import { Routes, Route, Navigate } from 'react-router';

import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';
import { CocktailCodes } from './types/cocktail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={CocktailCodes.Margarita} />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/:cocktailCode" element={<Layout />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
