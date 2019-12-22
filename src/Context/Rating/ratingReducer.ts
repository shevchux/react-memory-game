import { RatingState } from './RatingState';
import { MapActionsInterfacesToActions } from '../../helpers/reducer';

export enum RatingAction {
  PLACE_IN_RATING = 'PLACE_IN_RATING',
  INIT_PLAYER = 'INIT_PLAYER'
}

export interface RatingActionsInterfaces {
  [RatingAction.PLACE_IN_RATING]: { score: number, date: number };
  [RatingAction.INIT_PLAYER]: { name: string };
}

export const ratingReducer = (
  state: RatingState, action: MapActionsInterfacesToActions<RatingActionsInterfaces>,
): RatingState => {
  switch (action.type) {
    case RatingAction.PLACE_IN_RATING: {
      const { date, score } = action.payload;
      const me = { ...state.me, lastScore: score };

      const prevPlace = state.rating.find((player) => player.id === state.me.id);

      if (prevPlace && prevPlace.score < action.payload.score) {
        return { ...state, me };
      }

      const newRating = state.rating.filter((player) => player.id !== me.id);
      newRating.push({
        id: state.me.id,
        name: state.me.name,
        date,
        score,
      });
      newRating.sort((playerA, playerB) => (playerA.score > playerB.score ? 1 : -1));
      me.bestPlace = newRating.findIndex((player) => player.id === me.id);
      me.bestScore = score;

      return { ...state, rating: newRating, me };
    }

    case RatingAction.INIT_PLAYER: {
      return {
        ...state,
        me: {
          ...state.me,
          name: action.payload.name,
        },
      };
    }

    default:
      return state;
  }
};
