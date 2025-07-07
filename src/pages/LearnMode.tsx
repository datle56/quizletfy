import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Volume2, X, Check, Settings, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { useQuizSets } from '../hooks/useQuizSets';

const LearnMode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizSets, loading } = useQuizSets();
  const { isDarkMode } = useThemeStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTerm, setShowTerm] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [studyQueue, setStudyQueue] = useState<string[]>([]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const quizSet = quizSets.find(set => set.id === id);

  if (!quizSet) {
    return <NotFound />;
  }

  // Initialize study queue with adaptive learning
  useEffect(() => {
    if (quizSet) {
      const queue = quizSet.cards.map(card => card.id);
      setStudyQueue(queue);
    }
  }, [quizSet]);

  const currentCard = quizSet.cards.find(card => card.id === studyQueue[currentIndex]);
  const progress = ((currentIndex + 1) / studyQueue.length) * 100;
  const masteredCount = masteredCards.size;
  const reviewCount = reviewCards.size;
  const notStudiedCount = studyQueue.length - masteredCount - reviewCount;

  const handleNext = () => {
    if (currentIndex < studyQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setShowCelebration(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowCelebration(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReviewAgain = () => {
    if (!currentCard) return;
    
    const cardId = currentCard.id;
    setReviewCards(prev => new Set([...prev, cardId]));
    setMasteredCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    
    // Add card back to queue for review
    setStudyQueue(prev => [...prev, cardId]);
    handleNext();
  };

  const handleGotIt = () => {
    if (!currentCard) return;
    
    const cardId = currentCard.id;
    setMasteredCards(prev => new Set([...prev, cardId]));
    setReviewCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    handleNext();
  };

  const handleBack = () => {
    navigate(`/app/quiz/${id}`);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards(new Set());
    setReviewCards(new Set());
    setShowCelebration(false);
    setStudyQueue(quizSet.cards.map(card => card.id));
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50 text-gray-900';
  
  const headerClasses = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  if (!currentCard) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      {/* Header */}
      <div className={`${headerClasses} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className={`flex items-center space-x-2 transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Brain className="h-5 w-5 text-green-500" />
                <h1 className="text-lg font-semibold">Learn Mode</h1>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {quizSet.title} • {currentIndex + 1} of {studyQueue.length}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowControls(!showControls)}
                className={`p-2 transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="h-5 w-5" />
              </button>
              
              <button 
                onClick={handleRestart}
                className={`p-2 transition-colors ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-400">{notStudiedCount}</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Not studied</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">{reviewCount}</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Review again</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">{masteredCount}</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mastered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-3xl">
            {showCelebration ? (
              // Celebration Card
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-gradient-to-br from-green-600 to-green-700 rounded-2xl border-2 border-green-500 shadow-2xl p-12 text-center min-h-[300px] flex flex-col justify-center"
              >
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl mb-4"
                  >
                    🧠
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    Learning Complete!
                  </h3>
                  
                  <p className="text-green-100 mb-8 text-lg">
                    You've mastered {masteredCount} out of {quizSet.cards.length} terms using adaptive learning.
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={handleRestart}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                    >
                      Learn Again
                    </motion.button>
                    
                    <motion.button
                      onClick={handleBack}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-900 transition-colors font-semibold"
                    >
                      Back to Set
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Learning Card
              <motion.div
                className="relative h-80 cursor-pointer"
                onClick={handleFlip}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFlipped ? 'back' : 'front'}
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -90 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 rounded-2xl border-2 shadow-2xl flex flex-col justify-center items-center p-12 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
                        : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-center w-full">
                      <div className="flex items-center justify-center mb-6">
                        <span className={`text-sm font-medium uppercase tracking-wide mr-4 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {isFlipped ? (showTerm ? 'Definition' : 'Term') : (showTerm ? 'Term' : 'Definition')}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(isFlipped 
                              ? (showTerm ? currentCard.definition : currentCard.term)
                              : (showTerm ? currentCard.term : currentCard.definition)
                            );
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode 
                              ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                          }`}
                        >
                          <Volume2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                        {isFlipped 
                          ? (showTerm ? currentCard.definition : currentCard.term)
                          : (showTerm ? currentCard.term : currentCard.definition)
                        }
                      </div>
                      
                      <div className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
                        <p className="text-sm">Click to flip</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        {/* Card Controls */}
        {isFlipped && showControls && !showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-8 mt-8"
          >
            <motion.button
              onClick={handleReviewAgain}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl transition-colors font-semibold text-white shadow-lg"
            >
              <X className="h-6 w-6" />
              <span>Review Again</span>
            </motion.button>
            
            <motion.button
              onClick={handleGotIt}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl transition-colors font-semibold text-white shadow-lg"
            >
              <Check className="h-6 w-6" />
              <span>Got It</span>
            </motion.button>
          </motion.div>
        )}

        {/* Navigation */}
        {!showCelebration && (
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentIndex === 0
                  ? isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>
            
            <div className="text-center">
              <div className="text-lg font-semibold mb-1">
                Card {currentIndex + 1} / {studyQueue.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {Math.round((masteredCount / quizSet.cards.length) * 100)}% mastered
              </div>
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === studyQueue.length - 1 && !showCelebration}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentIndex === studyQueue.length - 1 && !showCelebration
                  ? isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnMode;