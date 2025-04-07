import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import deathStarImg from '../../assets/404.svg';

interface NotFoundProps {
  language: 'en' | 'wookiee';
}

const t = {
  en: { title: '404', text: 'Page not found', back: 'Return', home: 'Home' },
  wookiee: { title: '404', text: 'Raaaaaaargh!', back: 'Gwah!', home: 'emoH' },
};

const NotFound: React.FC<NotFoundProps> = ({ language }) => {
  const nav = useNavigate();
  const dict = language === 'wookiee' ? t.wookiee : t.en;
  return (
    <div className='notfound'>
      <h1 className='notfound__title'>
        <span className='notfound__digit'>4</span>
        <img src={deathStarImg} alt='Death Star' className='notfound__image' />
        <span className='notfound__digit'>4</span>
      </h1>
      <p className='notfound__text'>{dict.text}</p>
      <div className='notfound__buttons'>
        <button className='notfound__button' onClick={() => nav(-1)}>
          {dict.back}
        </button>
        <button className='notfound__button' onClick={() => nav('/')}>
          {dict.home}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
