import React from 'react';
import './index.scss';

const classNames = require('classnames');

interface CardProps {
  value: number;
  opened: boolean;
  played: boolean;
  error: boolean;
  onClick?(): void;
}

export const Card: React.FC<CardProps> = ({
  value, opened, played, error, onClick,
}) => {
  const className = classNames(
    'card',
    `card_value${value}`,
    {
      card_opened: opened,
      card_played: played,
      card_error: error,
    },
  );

  return (
    <div onClick={onClick} className={className}>
      <div className="card__back" />
      <div className="card__front" />
    </div>
  );
};
