
import React from 'react';
import { Trophy, RotateCcw, Home } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  onMenu: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart, onMenu }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-12 rounded-[2rem] text-center shadow-2xl animate-in zoom-in duration-300">
      <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-500/20">
        <Trophy size={48} className="text-white" />
      </div>
      
      <h2 className="text-4xl font-bold mb-2">Time's Up!</h2>
      <p className="text-slate-400 mb-8">You've done a great job practicing.</p>
      
      <div className="bg-slate-900/50 rounded-2xl p-6 mb-10 inline-block border border-slate-700">
        <span className="block text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Final Score</span>
        <span className="text-5xl font-black text-blue-400">{score}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105"
        >
          <RotateCcw size={20} />
          Play Again
        </button>
        <button
          onClick={onMenu}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105"
        >
          <Home size={20} />
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default GameOver;
