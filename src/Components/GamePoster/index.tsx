import React from 'react';
import './styles.scss';

interface GamePosterProps {
  title?: string;
}

export const GamePoster: React.FC<GamePosterProps> = ({ title }) => (
  <div className="poster">
    <div className="poster__image" />
    {Boolean(title) && <div className="poster__title">{title}</div>}
  </div>
);
