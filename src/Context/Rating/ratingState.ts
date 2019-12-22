interface Player {
  id: number;
  name: string;
  score: number;
  date: number;
}

export interface RatingState {
  rating: Player[],
  me: {
    id: number;
    name: string;
    lastScore: number;
    bestScore: number;
    bestPlace: number;
  };
}

export const initialState: RatingState = {
  me: {
    id: null,
    name: null,
    lastScore: Infinity,
    bestScore: Infinity,
    bestPlace: Infinity,
  },
  rating: [{
    id: 1,
    name: 'Ivan',
    score: 34000,
    date: 1,
  },
  {
    id: 2,
    name: 'Maria',
    score: 35000,
    date: 1,
  },
  {
    id: 3,
    name: 'Vitaly',
    score: 324000,
    date: 1,
  },
  {
    id: 4,
    name: 'Vika',
    score: 123456789,
    date: 1,
  }],
};
