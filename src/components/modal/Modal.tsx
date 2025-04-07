import React, { useEffect, useCallback } from 'react';
import './Modal.css';
import { Character } from '../../api/swapi';
import closeIcon from '../../assets/close_Icon.svg';
import femaleIcon from '../../assets/female.svg';
import maleIcon from '../../assets/male.svg';
import naIcon from '../../assets/hermaphrodite.svg';

interface ModalProps {
  character: Character;
  onClose: () => void;
  language: 'en' | 'wookiee';
}

const Modal: React.FC<ModalProps> = ({ character, onClose, language }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const getGenderIcon = (g?: string) =>
    g?.toLowerCase() === 'male' ? maleIcon : g?.toLowerCase() === 'female' ? femaleIcon : naIcon;

  const hairLabel = language === 'wookiee' ? 'acwoa hair' : 'hair color';
  const skinLabel = language === 'wookiee' ? 'acwoa skin' : 'skin color';
  const eyeLabel = language === 'wookiee' ? 'acwoa eye' : 'eye color';
  const heightLbl = language === 'wookiee' ? 'acwoahrracao' : 'height';
  const massLbl = language === 'wookiee' ? 'scracc' : 'mass';
  const genderLabel = language === 'wookiee' ? 'rrwowhwaworc' : 'Gender';

  const getGenderTagClass = (gender?: string) => {
    if (!gender) return '';
    if (gender.toLowerCase() === 'male') return 'modal__tag--yellow';
    if (gender.toLowerCase() === 'female') return 'modal__tag--purple';
    return 'modal__tag--green';
  };

  return (
    <div className='modal' onClick={handleOverlayClick}>
      <div className='modal__wrapper'>
        <div className='modal__content'>
          <div className='modal__left'>
            <img className='modal__avatar' src={getGenderIcon(character.gender)} alt={character.gender} />
            <div className='modal__tags'>
              {!!character.gender && (
                <span className={`modal__tag tag-gender ${getGenderTagClass(character.gender)}`}>
                  {genderLabel}: {character.gender}
                </span>
              )}
              {!!character.birth_year && (
                <span className='modal__tag tag-birth'>
                  {language === 'wookiee' ? 'rhahrcaoac' : 'Birth'}: {character.birth_year}
                </span>
              )}
            </div>
          </div>
          <div className='modal__right'>
            <h2 className='modal__title'>{character.name}</h2>
            <div className='modal__info-box'>
              {!!character.hair_color && (
                <p>
                  {hairLabel}: {character.hair_color}
                </p>
              )}
              {!!character.skin_color && (
                <p>
                  {skinLabel}: {character.skin_color}
                </p>
              )}
              {!!character.eye_color && (
                <p>
                  {eyeLabel}: {character.eye_color}
                </p>
              )}
            </div>
            <div className='modal__stats'>
              {!!character.height && (
                <div className='modal__stat'>
                  <span className='modal__stat-value'>{character.height}</span>
                  <span className='modal__stat-label'>{heightLbl}</span>
                </div>
              )}
              {!!character.mass && (
                <div className='modal__stat'>
                  <span className='modal__stat-value'>{character.mass}</span>
                  <span className='modal__stat-label'>{massLbl}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <button className='modal__close' onClick={onClose}>
          <img src={closeIcon} alt='Close' />
        </button>
      </div>
    </div>
  );
};

export default Modal;
