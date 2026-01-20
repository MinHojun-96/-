
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Category, WordData } from '../types';
import { CATEGORY_WORDS, GAME_DURATION, EMERGENCY_THRESHOLD } from '../constants';
import { playAlarm, speakWord } from '../utils/audioUtils';
import { Loader2, Timer, Star, Volume2 } from 'lucide-react';

interface WordPuzzleProps {
  category: Category;
  onGameOver: (score: number) => void;
  onScoreUpdate: (score: number) => void;
}

const WordPuzzle: React.FC<WordPuzzleProps> = ({ category, onGameOver, onScoreUpdate }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [shuffledLetters, setShuffledLetters] = useState<{char: string, id: number}[]>([]);
  const [score, setScore] = useState(0);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const wordList = CATEGORY_WORDS[category];

  // Initialize Audio Context for alarms
  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioCtxRef.current?.close();
      if (loopRef.current) window.clearInterval(loopRef.current);
      if (timerRef.current) window.clearInterval(timerRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Timer logic
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          onGameOver(score);
          return 0;
        }
        if (prev <= EMERGENCY_THRESHOLD && audioCtxRef.current) {
          playAlarm(audioCtxRef.current);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [onGameOver, score]);

  // Load Word Data from Local Constants
  const loadWord = useCallback((index: number) => {
    setLoading(true);
    const wordInfo = wordList[index];
    
    // Set word state
    setCurrentWord({ word: wordInfo.word, description: wordInfo.desc });
    
    // Shuffle letters
    const letters = wordInfo.word.split('').map((char, i) => ({ char, id: i }));
    setShuffledLetters([...letters].sort(() => Math.random() - 0.5));
    setPlacedLetters(new Array(wordInfo.word.length).fill(''));
    
    // Setup Audio Loop (Browser TTS)
    if (loopRef.current) window.clearInterval(loopRef.current);
    
    const speak = () => speakWord(wordInfo.word);
    speak(); // Speak immediately
    loopRef.current = window.setInterval(speak, 3500); // Repeat every 3.5 seconds

    setTimeout(() => setLoading(false), 300); // Small delay for smooth transition
  }, [wordList]);

  useEffect(() => {
    loadWord(wordIndex);
  }, [wordIndex, loadWord]);

  // Game Logic
  const handleLetterClick = (letter: {char: string, id: number}, indexInShuffle: number) => {
    const nextEmptyIndex = placedLetters.indexOf('');
    if (nextEmptyIndex === -1) return;

    // Check if correct
    const targetChar = currentWord!.word[nextEmptyIndex];
    if (letter.char === targetChar) {
      const newPlaced = [...placedLetters];
      newPlaced[nextEmptyIndex] = letter.char;
      setPlacedLetters(newPlaced);

      const newShuffled = [...shuffledLetters];
      newShuffled.splice(indexInShuffle, 1);
      setShuffledLetters(newShuffled);

      // Check for word completion
      if (newPlaced.join('') === currentWord!.word) {
        const nextIdx = (wordIndex + 1) % wordList.length;
        setScore(s => s + 10);
        onScoreUpdate(score + 10);
        
        // Final success speech
        window.speechSynthesis.cancel();
        speakWord("Correct!");
        
        setTimeout(() => setWordIndex(nextIdx), 800);
      }
    } else {
      // Wrong letter feedback
      const utterance = new SpeechSynthesisUtterance("Try again");
      utterance.rate = 1.5;
      window.speechSynthesis.speak(utterance);
    }
  };

  const isEmergency = timeLeft <= EMERGENCY_THRESHOLD;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-800/30 rounded-3xl backdrop-blur-sm border border-slate-700/50">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-slate-400 font-medium">Preparing next puzzle...</p>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-300 w-full rounded-3xl p-8 bg-slate-800/30 backdrop-blur-md border border-slate-700/50 flex flex-col items-center relative overflow-hidden ${isEmergency ? 'emergency-glow' : ''}`}>
      
      {/* Header Info */}
      <div className="w-full flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-2xl border border-slate-700">
          <Star className="text-yellow-400 fill-yellow-400" size={20} />
          <span className="text-xl font-bold">{score}</span>
        </div>
        
        <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border transition-all ${isEmergency ? 'bg-red-500 text-white border-red-400 animate-pulse' : 'bg-slate-900/50 border-slate-700'}`}>
          <Timer size={20} />
          <span className="text-xl font-mono font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Visual Description Card (Replaces Image) */}
      <div className="w-full max-w-md aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 mb-12 transform hover:scale-105 transition-transform duration-500 relative border-4 border-white/10 group">
        <Volume2 className="absolute top-4 right-4 text-white/30 group-hover:text-white/80 transition-colors animate-pulse" />
        <p className="text-white text-2xl md:text-3xl font-bold text-center leading-relaxed">
          "{currentWord?.description}"
        </p>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-bold tracking-widest uppercase">
          Hint Description
        </div>
      </div>

      {/* Word Slots */}
      <div className="flex gap-2 md:gap-4 mb-12 flex-wrap justify-center">
        {placedLetters.map((char, i) => (
          <div 
            key={i} 
            className={`w-12 h-16 md:w-16 md:h-20 flex items-center justify-center text-3xl md:text-4xl font-black rounded-xl border-2 transition-all duration-300 ${char ? 'bg-blue-600 border-blue-400 text-white shadow-lg scale-110' : 'bg-slate-900/50 border-slate-700 border-dashed text-slate-600'}`}
          >
            {char}
          </div>
        ))}
      </div>

      {/* Clickable Letters */}
      <div className="flex gap-3 md:gap-5 flex-wrap justify-center p-6 bg-slate-900/30 rounded-3xl min-h-[120px] w-full items-center border border-slate-700/30 shadow-inner">
        {shuffledLetters.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleLetterClick(item, idx)}
            className="w-12 h-16 md:w-16 md:h-20 bg-slate-100 text-slate-900 text-3xl md:text-4xl font-black rounded-xl shadow-lg hover:bg-white hover:-translate-y-2 active:translate-y-0.5 active:bg-slate-200 transition-all cursor-pointer border-b-4 border-slate-300 active:border-b-0"
          >
            {item.char}
          </button>
        ))}
      </div>

      {/* Instructional Help */}
      <p className="mt-8 text-slate-500 font-medium italic flex items-center gap-2">
        Listen to the word and click the letters in order!
      </p>
    </div>
  );
};

export default WordPuzzle;
