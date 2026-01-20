
import React, { useState, useCallback } from 'react';
import { Category, GameState } from './types';
import CategoryMenu from './components/CategoryMenu';
import WordPuzzle from './components/WordPuzzle';
import GameOver from './components/GameOver';
import { RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentCategory: null,
    isPlaying: false,
    score: 0,
    currentWordIndex: 0
  });

  const handleSelectCategory = (category: Category) => {
    setGameState({
      ...gameState,
      currentCategory: category,
      isPlaying: true,
      score: 0,
      currentWordIndex: 0
    });
  };

  const handleGameOver = (finalScore: number) => {
    setGameState({
      ...gameState,
      isPlaying: false,
      score: finalScore
    });
  };

  const handleReturnToMenu = () => {
    setGameState({
      currentCategory: null,
      isPlaying: false,
      score: 0,
      currentWordIndex: 0
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-900 text-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
      </div>

      <header className="mb-8 z-10 flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
          <RefreshCcw className="text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">WordLens <span className="text-blue-400">Puzzle</span></h1>
      </header>

      <main className="w-full max-w-4xl z-10">
        {!gameState.currentCategory && !gameState.isPlaying && (
          <CategoryMenu onSelect={handleSelectCategory} />
        )}

        {gameState.currentCategory && gameState.isPlaying && (
          <WordPuzzle 
            category={gameState.currentCategory} 
            onGameOver={handleGameOver}
            onScoreUpdate={(score) => setGameState(prev => ({ ...prev, score }))}
          />
        )}

        {gameState.currentCategory && !gameState.isPlaying && (
          <GameOver 
            score={gameState.score} 
            onRestart={() => handleSelectCategory(gameState.currentCategory!)}
            onMenu={handleReturnToMenu}
          />
        )}
      </main>

      <footer className="mt-8 text-slate-500 text-sm z-10">
        Powered by Gemini AI • 2024 WordLens Project
      </footer>
    </div>
  );
};

export default App;
