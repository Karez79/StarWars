import React from 'react';
import { Link } from 'react-router-dom';
import yodaImg from '../../assets/home_banner_yoda.svg';
import './Home.css';

interface HomeProps {
  language: 'en' | 'wookiee';
}

const t = {
  en: {
    title: 'Welcome to the Star Wars database!',
    subtitle: 'Explore characters and more...',
    cta: 'See Characters',
  },
  wookiee: {
    title: 'Wyaaaaa! rcwochuanaoc scra grarr raaaaa!',
    subtitle: 'wwwhwara whrascwo, mrrrrh...',
    cta: 'rrwowhwaworc',
  },
};

const Home: React.FC<HomeProps> = ({ language }) => {
  const dict = language === 'wookiee' ? t.wookiee : t.en;
  return (
    <div className='page-bg'>
      <section className='home'>
        <div className='home__content'>
          <div className='home__text'>
            <h1 className='home__title'>{dict.title}</h1>
            <h2 className='home__subtitle'>{dict.subtitle}</h2>
            <Link to='/characters' className='home__cta'>
              {dict.cta}
            </Link>
          </div>
          <div className='home__image-wrapper'>
            <img src={yodaImg} alt='Master Yoda' className='home__image' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
