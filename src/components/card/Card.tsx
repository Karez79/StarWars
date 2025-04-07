import React from 'react';
import './Card.css';
import { Character } from '../../api/swapi';

interface CardProps {
  character: Character;
  onClick: () => void;
  language: 'en' | 'wookiee';
}

const Card: React.FC<CardProps> = ({ character, onClick, language }) => {
  const heightLabel = language === 'wookiee' ? 'acwoahrracao' : 'height';
  const massLabel = language === 'wookiee' ? 'scracc' : 'mass';
  const birthLabel = language === 'wookiee' ? 'rhahrcaoac' : 'Birth';
  const genderLabel = language === 'wookiee' ? 'rrwowhwaworc' : 'Gender';

  const getGenderTagClass = (gender?: string) => {
    if (!gender) return '';
    if (gender.toLowerCase() === 'male') return 'card__tag--yellow';
    if (gender.toLowerCase() === 'female') return 'card__tag--purple';
    return 'card__tag--green';
  };

  return (
    <div className='card' onClick={onClick}>
      <h3 className='card__name'>{character.name}</h3>
      <div className='card__stats'>
        {!!character.height && (
          <div className='card__stat'>
            <span className='card__stat-label'>{heightLabel}</span>
            <span className='card__stat-value'>{character.height}</span>
          </div>
        )}
        {!!character.mass && (
          <div className='card__stat'>
            <span className='card__stat-label'>{massLabel}</span>
            <span className='card__stat-value'>{character.mass}</span>
          </div>
        )}
      </div>
      {!!character.birth_year && (
        <span className='card__tag card__tag--blue'>
          {birthLabel}: {character.birth_year}
        </span>
      )}
      {!!character.gender && (
        <span className={`card__tag ${getGenderTagClass(character.gender)}`}>
          {genderLabel}: {character.gender}
        </span>
      )}
    </div>
  );
};

export default Card;
