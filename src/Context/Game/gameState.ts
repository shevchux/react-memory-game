import { Card } from '../Game/gameContext';

export interface GameState {
  cards: Card[];
  size: number;
  preview: boolean;
  cardsLeft: number;
  timeStart: number;
}

export const initialState: GameState = {
  cards: [],
  size: 0,
  preview: false,
  cardsLeft: null,
  timeStart: null,
};
