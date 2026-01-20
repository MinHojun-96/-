
import { Category } from './types';

export interface WordInfo {
  word: string;
  desc: string;
}

export const CATEGORY_WORDS: Record<Category, WordInfo[]> = {
  [Category.TRAVEL]: [
    { word: 'AIRPLANE', desc: 'A vehicle that flies in the sky with wings.' },
    { word: 'PASSPORT', desc: 'An official document you need to travel to other countries.' },
    { word: 'SUITCASE', desc: 'A large case used for carrying clothes while traveling.' },
    { word: 'HOTEL', desc: 'A place where you pay to stay and sleep while on a trip.' },
    { word: 'BEACH', desc: 'A sandy area next to the ocean or sea.' },
    { word: 'CAMERA', desc: 'A device used to take photographs and capture memories.' },
    { word: 'MAP', desc: 'A drawing that shows where places, roads, and cities are.' }
  ],
  [Category.ANIMAL]: [
    { word: 'LION', desc: 'A large wild cat known as the king of the jungle.' },
    { word: 'ELEPHANT', desc: 'The largest land animal with a long trunk and big ears.' },
    { word: 'PENGUIN', desc: 'A black and white bird that cannot fly but swims well.' },
    { word: 'GIRAFFE', desc: 'An animal with a very long neck and orange spots.' },
    { word: 'DOLPHIN', desc: 'An intelligent mammal that lives in the ocean and jumps.' },
    { word: 'KANGAROO', desc: 'An Australian animal that hops and carries babies in a pouch.' },
    { word: 'TIGER', desc: 'A large orange cat with black stripes.' }
  ],
  [Category.COUNTRY]: [
    { word: 'KOREA', desc: 'A country in East Asia famous for K-pop and delicious food.' },
    { word: 'FRANCE', desc: 'A European country famous for the Eiffel Tower and bread.' },
    { word: 'BRAZIL', desc: 'A large South American country known for soccer and festivals.' },
    { word: 'JAPAN', desc: 'An island country in Asia famous for cherry blossoms and sushi.' },
    { word: 'EGYPT', desc: 'A country in Africa famous for its ancient pyramids and deserts.' },
    { word: 'ITALY', desc: 'A European country famous for pizza, pasta, and history.' },
    { word: 'MEXICO', desc: 'A North American country known for tacos and vibrant culture.' }
  ]
};

export const GAME_DURATION = 60; // 60 seconds
export const EMERGENCY_THRESHOLD = 5; // 5 seconds left
