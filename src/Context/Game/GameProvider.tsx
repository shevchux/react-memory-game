import React, {
  useReducer, useRef, useEffect, useState,
} from 'react';
import { initialState } from './gameState';
import { gameReducer, GameAction } from './gameReducer';
import { GameContext } from './gameContext';
import { PREVIEW_DELAY, BACK_REVERSE_TIMEOUT, CARD_PAIRS } from '../../config';

export const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const firstCardIndex = useRef<number>(null);
  const secondCardIndex = useRef<number>(null);
  const timeoutId = useRef<NodeJS.Timeout>(null);

  const [score, setScore] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScore(Number(new Date()) - state.timeStart);
    }, 1000);

    return () => clearTimeout(intervalId);
  }, [state.timeStart]);

  const replay = (): void => {
    dispatch({ type: GameAction.INIT, payload: { size: CARD_PAIRS } });
    dispatch({ type: GameAction.OPEN_ALL_CARDS, payload: {} });
    setTimeout(dispatch, PREVIEW_DELAY, { type: GameAction.HIDE_ALL_CARDS, payload: {} });
    setScore(0);
  };

  const closeOpenedCardPair = (): void => {
    dispatch({ type: GameAction.CLOSE_CARD, payload: { index: firstCardIndex.current } });
    dispatch({ type: GameAction.CLOSE_CARD, payload: { index: secondCardIndex.current } });
    firstCardIndex.current = null;
    secondCardIndex.current = null;
  };

  const openCard = (index: number): void => {
    if (state.cards[index].opened || state.cards[index].played) return;

    dispatch({ type: GameAction.OPEN_CARD, payload: { index } });

    if (firstCardIndex.current !== null && secondCardIndex.current === null) {
      secondCardIndex.current = index;
      dispatch({
        type: GameAction.CHECK_CARD_PAIR,
        payload: { firstCardIndex: firstCardIndex.current, secondCardIndex: secondCardIndex.current },
      });
      timeoutId.current = setTimeout(closeOpenedCardPair, BACK_REVERSE_TIMEOUT);
    } else {
      clearTimeout(timeoutId.current);
      closeOpenedCardPair();
      firstCardIndex.current = index;
    }
  };

  return (
    <GameContext.Provider value={{
      ...state, score, replay, openCard,
    }}
    >
      {children}
    </GameContext.Provider>
  );
};
