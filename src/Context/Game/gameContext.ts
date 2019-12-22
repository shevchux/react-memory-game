import React, { useContext } from 'react';
import { GameState } from './gameState';

export interface Card {
  id: number,
  value: number,
  opened: boolean,
  played: boolean,
  error: boolean
}

interface GameContextProps extends GameState {
  score: number;
  replay(): void;
  openCard(index: number): void;
}

export const GameContext = React.createContext<GameContextProps>({} as GameContextProps);

export const useGame = (): GameContextProps => useContext(GameContext);
