
export enum Category {
  TRAVEL = 'TRAVEL',
  ANIMAL = 'ANIMAL',
  COUNTRY = 'COUNTRY'
}

export interface WordData {
  word: string;
  description: string;
}

export interface GameState {
  currentCategory: Category | null;
  isPlaying: boolean;
  score: number;
  currentWordIndex: number;
}
