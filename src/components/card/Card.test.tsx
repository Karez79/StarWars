// Card.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { Character } from '../../api/swapi';

describe('Card component', () => {
  const onClickMock = jest.fn();

  const baseCharacter: Character = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    height: '172',
    mass: '77',
    gender: 'male',
  };

  it('renders card with correct info for male in English', () => {
    render(<Card character={baseCharacter} onClick={onClickMock} language='en' />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/Birth: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    // Проверяем, что тег гендера имеет класс для male (yellow)
    const genderTag = screen.getByText(/Gender: male/i);
    expect(genderTag).toHaveClass('card__tag--yellow');
  });

  it('renders card with correct info for female in English', () => {
    const femaleCharacter: Character = { ...baseCharacter, name: 'Leia Organa', gender: 'female' };
    render(<Card character={femaleCharacter} onClick={onClickMock} language='en' />);
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    // Проверяем, что тег гендера имеет класс для female (purple)
    const genderTag = screen.getByText(/Gender: female/i);
    expect(genderTag).toHaveClass('card__tag--purple');
  });

  it('renders card with correct info for n/a in English', () => {
    const naCharacter: Character = { ...baseCharacter, name: 'R2-D2', gender: 'n/a' };
    render(<Card character={naCharacter} onClick={onClickMock} language='en' />);
    expect(screen.getByText('R2-D2')).toBeInTheDocument();
    // Проверяем, что тег гендера имеет класс для n/a (green)
    const genderTag = screen.getByText(/Gender: n\/a/i);
    expect(genderTag).toHaveClass('card__tag--green');
  });

  it('renders card with wookiee labels', () => {
    render(<Card character={baseCharacter} onClick={onClickMock} language='wookiee' />);
    // Для языка wookiee ожидаем соответствующие лейблы
    expect(screen.getByText('acwoahrracao')).toBeInTheDocument();
    expect(screen.getByText('scracc')).toBeInTheDocument();
    expect(screen.getByText(/rrwowhwaworc: male/i)).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<Card character={baseCharacter} onClick={onClickMock} language='en' />);
    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
