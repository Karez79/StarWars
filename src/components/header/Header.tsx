import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LanguageToggle from '../languageToggle/LanguageToggle';
import logo from '../../assets/header_logo.svg';
import laserRed from '../../assets/laser_red.svg';
import laserGreen from '../../assets/laser_green.svg';
import './Header.css';

interface HeaderProps {
  language: 'en' | 'wookiee';
  onToggleLanguage: () => void;
}

const t = {
  en: { home: 'Home', characters: 'Characters' },
  wookiee: { home: 'emoH', characters: 'sretcarahC' },
};

const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  const dict = language === 'wookiee' ? t.wookiee : t.en;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='header' ref={headerRef}>
      <div className='header__container'>
        <NavLink to='/'>
          <img src={logo} alt='Star Wars' className='header__logo' />
        </NavLink>
        <div className={`header__burger ${isMenuOpen ? 'header__burger--open' : ''}`} onClick={toggleMenu}>
          <div className='lightsaber-icon lightsaber-icon--left'>
            <img src={laserGreen} alt='Green Laser' />
          </div>
          <div className='lightsaber-icon lightsaber-icon--right'>
            <img src={laserRed} alt='Red Laser' />
          </div>
        </div>
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link')}
            onClick={() => setIsMenuOpen(false)}
          >
            {dict.home}
          </NavLink>
          <NavLink
            to='/characters'
            className={({ isActive }) => (isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link')}
            onClick={() => setIsMenuOpen(false)}
          >
            {dict.characters}
          </NavLink>
          <LanguageToggle language={language} onToggle={onToggleLanguage} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
