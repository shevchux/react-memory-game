import { GameState } from './gameState';
import { MapActionsInterfacesToActions } from '../../helpers/reducer';

export enum GameAction {
  INIT = 'INIT_GAME',
  OPEN_ALL_CARDS = 'OPEN_ALL_CARDS',
  HIDE_ALL_CARDS = 'HIDE_ALL_CARDS',
  OPEN_CARD = 'OPEN_CARD',
  CLOSE_CARD = 'CLOSE_CARD',
  CHECK_CARD_PAIR = 'CHECK_CARD_PAIR',
}

export interface GameActionsInterfaces {
  [GameAction.INIT]: { size: number };
  [GameAction.OPEN_ALL_CARDS]: {};
  [GameAction.HIDE_ALL_CARDS]: {};
  [GameAction.OPEN_CARD]: { index: number };
  [GameAction.CLOSE_CARD]: { index: number };
  [GameAction.CHECK_CARD_PAIR]: { firstCardIndex: number, secondCardIndex: number };
}

export const gameReducer = (
  state: GameState, action: MapActionsInterfacesToActions<GameActionsInterfaces>,
): GameState => {
  switch (action.type) {
    case GameAction.INIT: {
      const { size } = action.payload;
      const cardValues = Array(size).fill(0).map((_, i) => i);
      const cards = cardValues
        .concat(cardValues)
        .sort(() => 0.5 - Math.random())
        .map((cardValue, index) => ({
          id: index,
          value: cardValue,
          opened: false,
          played: false,
          error: false,
        }));

      return {
        ...state,
        preview: false,
        size,
        cards,
        cardsLeft: cards.length,
        timeStart: Number(new Date()),
      };
    }

    case GameAction.OPEN_ALL_CARDS: {
      return {
        ...state,
        preview: true,
        cards: state.cards.map((card) => (
          { ...card, opened: true }
        )),
      };
    }

    case GameAction.HIDE_ALL_CARDS: {
      return {
        ...state,
        preview: false,
        cards: state.cards.map((card) => (
          { ...card, opened: false }
        )),
      };
    }

    case GameAction.CLOSE_CARD: {
      return {
        ...state,
        preview: false,
        cards: state.cards.map((card, index) => {
          if (index === action.payload.index) {
            return (
              { ...card, opened: false, error: false }
            );
          }

          return card;
        }),
      };
    }

    case GameAction.OPEN_CARD: {
      return {
        ...state,
        preview: false,
        cards: state.cards.map((card, index) => {
          if (index === action.payload.index) {
            return (
              { ...card, opened: true }
            );
          }

          return card;
        }),
      };
    }

    case GameAction.CHECK_CARD_PAIR: {
      const { firstCardIndex, secondCardIndex } = action.payload;

      if (firstCardIndex === null || secondCardIndex === null) {
        return state;
      }

      const firstCard = state.cards[firstCardIndex];
      const secondCard = state.cards[secondCardIndex];

      const played = firstCard.value === secondCard.value;
      const error = !played;

      const cards = state.cards.map((card, index) => {
        if (index === firstCardIndex || index === secondCardIndex) {
          return {
            ...card, played, error,
          };
        }

        return card;
      });

      return {
        ...state,
        cards,
        cardsLeft: cards.filter((card) => !card.played).length,
      };
    }

    default:
      return state;
  }
};
