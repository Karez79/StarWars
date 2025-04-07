import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Characters from './pages/characters/Characters';
import NotFound from './pages/notFound/NotFound';

const Layout: React.FC<{ language: 'en' | 'wookiee'; onToggleLanguage: () => void }> = ({
  language,
  onToggleLanguage,
}) => (
  <>
    <Header language={language} onToggleLanguage={onToggleLanguage} />
    <Outlet />
  </>
);

const App: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'wookiee'>('en');
  const toggleLanguage = () => setLanguage((p) => (p === 'en' ? 'wookiee' : 'en'));

  const basename = process.env.NODE_ENV === 'production' ? '/StarWars' : '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route element={<Layout language={language} onToggleLanguage={toggleLanguage} />}>
          <Route path='/' element={<Home language={language} />} />
          <Route path='/characters' element={<Characters language={language} />} />
        </Route>
        <Route path='*' element={<NotFound language={language} />} />
      </Routes>
    </Router>
  );
};

export default App;
