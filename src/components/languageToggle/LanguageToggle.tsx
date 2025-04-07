import React from 'react';
import './LanguageToggle.css';

interface LanguageToggleProps {
  language: 'en' | 'wookiee';
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => (
  <div className='language-toggle'>
    <span
      className={`language-toggle__option ${language === 'en' ? 'language-toggle__option--active' : ''}`}
      onClick={() => language !== 'en' && onToggle()}
    >
      en
    </span>
    {' | '}
    <span
      className={`language-toggle__option ${language === 'wookiee' ? 'language-toggle__option--active' : ''}`}
      onClick={() => language !== 'wookiee' && onToggle()}
    >
      wookiee
    </span>
  </div>
);

export default LanguageToggle;
