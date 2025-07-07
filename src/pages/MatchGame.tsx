import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { useQuizSets } from '../hooks/useQuizSets';

interface MatchCard {
  id: string;
  content: string;
  type: 'term' | 'definition';
  originalId: string;
  isMatched: boolean;
  isSelected: boolean;
}

const MatchGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizSets, loading } = useQuizSets();
  
  const [gameCards, setGameCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [shakeCards, setShakeCards] = useState<Set<string>>(new Set());

  const quizSet = quizSets.find(set => set.id === id);

  const initializeGame = useCallback(() => {
    if (!quizSet) return;
    
    // Take first 6 cards for a 4x3 grid (12 cards total)
    const selectedQuizCards = quizSet.cards.slice(0, 6);
    
    const cards: MatchCard[] = [];
    
    selectedQuizCards.forEach(card => {
      cards.push({
        id: `term-${card.id}`,
        content: card.term,
        type: 'term',
        originalId: card.id,
        isMatched: false,
        isSelected: false
      });
      
      cards.push({
        id: `def-${card.id}`,
        content: card.definition,
        type: 'definition',
        originalId: card.id,
        isMatched: false,
        isSelected: false
      });
    });
    
    // Shuffle cards
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    setGameCards(shuffledCards);
    setSelectedCards([]);
    setMatchedPairs(new Set());
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentTime(0);
  }, [quizSet]);

  // Initialize game
  useEffect(() => {
    if (!loading && quizSet) {
      initializeGame();
    }
  }, [loading, quizSet, initializeGame]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, startTime]);

  // Early returns after all hooks
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!quizSet) {
    return <NotFound />;
  }

  const handleCardClick = (clickedCard: MatchCard) => {
    if (clickedCard.isMatched || clickedCard.isSelected || selectedCards.length >= 2) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    const newSelectedCards = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedCards);

    // Update card selection state
    setGameCards(prev => prev.map(card => 
      card.id === clickedCard.id 
        ? { ...card, isSelected: true }
        : card
    ));

    if (newSelectedCards.length === 2) {
      const [first, second] = newSelectedCards;
      
      if (first.originalId === second.originalId && first.type !== second.type) {
        // Match found!
        setTimeout(() => {
          setMatchedPairs(prev => new Set([...prev, first.originalId]));
          setGameCards(prev => prev.map(card => 
            card.originalId === first.originalId 
              ? { ...card, isMatched: true, isSelected: false }
              : card
          ));
          setSelectedCards([]);
          
          // Check if game is completed
          if (matchedPairs.size + 1 === 6) {
            setGameCompleted(true);
            const finalTime = Date.now() - startTime;
            if (!bestTime || finalTime < bestTime) {
              setBestTime(finalTime);
            }
          }
        }, 500);
      } else {
        // No match - shake cards and reset
        setShakeCards(new Set([first.id, second.id]));
        setTimeout(() => {
          setGameCards(prev => prev.map(card => 
            card.id === first.id || card.id === second.id
              ? { ...card, isSelected: false }
              : card
          ));
          setSelectedCards([]);
          setShakeCards(new Set());
        }, 1000);
      }
    }
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const centiseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    navigate(`/app/quiz/${id}`);
  };

  const handlePlayAgain = () => {
    initializeGame();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-semibold">Match Game</h1>
              <p className="text-sm text-gray-400">{quizSet.title}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="font-mono text-lg">
                  {formatTime(currentTime)}
                </span>
              </div>
              <button 
                onClick={handlePlayAgain}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Game Instructions */}
        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Match the Terms with Definitions</h2>
            <p className="text-gray-400 mb-6">
              Click on a term and then its corresponding definition to make a match. 
              Complete all pairs as quickly as possible!
            </p>
            <div className="bg-gray-800 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-300">
                <strong>How to play:</strong> Click any card to start the timer, then find its matching pair.
              </p>
            </div>
          </motion.div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {gameCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: shakeCards.has(card.id) ? [-10, 10, -10, 10, 0] : 0
              }}
              transition={{ 
                delay: index * 0.05,
                x: { duration: 0.5 }
              }}
              className={`
                relative h-24 md:h-32 cursor-pointer rounded-xl border-2 transition-all duration-300
                ${card.isMatched 
                  ? 'bg-green-600 border-green-500 opacity-50' 
                  : card.isSelected 
                    ? 'bg-blue-600 border-blue-500 scale-105' 
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-750'
                }
                ${card.type === 'term' ? 'border-l-4 border-l-blue-400' : 'border-l-4 border-l-purple-400'}
              `}
              onClick={() => handleCardClick(card)}
              whileHover={{ scale: card.isMatched ? 1 : 1.02 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.98 }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <div className="text-center">
                  <div className={`text-xs font-medium mb-1 ${
                    card.type === 'term' ? 'text-blue-300' : 'text-purple-300'
                  }`}>
                    {card.type === 'term' ? 'TERM' : 'DEFINITION'}
                  </div>
                  <div className="text-sm font-medium leading-tight">
                    {card.content}
                  </div>
                </div>
              </div>
              
              {card.isMatched && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-sm">✓</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <div className="text-center mb-8">
          <div className="bg-gray-800 rounded-lg p-4 inline-block">
            <div className="text-lg font-semibold mb-2">
              Progress: {matchedPairs.size} / 6 pairs matched
            </div>
            <div className="w-64 bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(matchedPairs.size / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Game Completed */}
        <AnimatePresence>
          {gameCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-700">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Trophy className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-4">🎉 Congratulations!</h3>
                  <p className="text-gray-300 mb-6">
                    You've successfully matched all pairs!
                  </p>
                  
                  <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="text-2xl font-bold text-blue-400 mb-2">
                      {formatTime(currentTime)}
                    </div>
                    <div className="text-sm text-gray-400">Your Time</div>
                    
                    {bestTime && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <div className="text-lg font-semibold text-green-400">
                          {formatTime(bestTime)}
                        </div>
                        <div className="text-xs text-gray-400">Personal Best</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handlePlayAgain}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={handleBack}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Back to Set
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MatchGame;