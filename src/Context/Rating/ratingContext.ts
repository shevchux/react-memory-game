import React, { useContext } from 'react';
import { RatingState } from './RatingState';

interface RatingContextProps extends RatingState {
  placeInRating(score: number, date: number): void;
  initPlayer(name: string): void;
}

export const RatingContext = React.createContext<RatingContextProps>({} as RatingContextProps);

export const useRating = (): RatingContextProps => useContext(RatingContext);
