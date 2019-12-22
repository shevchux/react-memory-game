import React, { useReducer } from 'react';
import { ratingReducer, RatingAction } from './ratingReducer';
import { initialState } from './RatingState';
import { RatingContext } from './RatingContext';

export const RatingProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(ratingReducer, initialState);

  const placeInRating = (score: number, date: number): void => {
    dispatch({ type: RatingAction.PLACE_IN_RATING, payload: { score, date } });
  };

  const initPlayer = (name: string): void => {
    dispatch({ type: RatingAction.INIT_PLAYER, payload: { name } });
  };

  return (
    <RatingContext.Provider
      value={{
        ...state,
        placeInRating,
        initPlayer,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};
