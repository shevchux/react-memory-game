import React from 'react';
import { useRating } from '../../Context/Rating/RatingContext';
import './styles.scss';
import { formatScore } from '../../helpers/format';

const classNames = require('classnames');

export const Rating: React.FC = () => {
  const { rating, me } = useRating();

  return (
    <div className="rating">
      <ul className="rating__list">
        {rating.map((player, index) => (
          <li
            key={player.id}
            className={classNames('rating__list-item rating-item', { 'rating-item_me': player.id === me.id })}
          >
            <div className="rating-item__place">{index + 1}</div>
            <div className="rating-item__name">{player.name}</div>
            <div className="rating-item__score">{formatScore(player.score)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
