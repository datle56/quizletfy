import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Volume2, X, Check, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { useQuizSets } from '../hooks/useQuizSets';

const FlashcardStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizSets, loading } = useQuizSets();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTerm, setShowTerm] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  const quizSet = quizSets.find(set => set.id === id);

  if (!quizSet) {
    return <NotFound />;
  }

  const currentCard = quizSet.cards[currentIndex];
  const progress = ((currentIndex + 1) / quizSet.cards.length) * 100;
  const masteredCount = masteredCards.size;
  const reviewCount = reviewCards.size;
  const notStudiedCount = quizSet.cards.length - masteredCount - reviewCount;

  const handleNext = () => {
    if (currentIndex < quizSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Last card - show celebration
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

  const toggleStartSide = () => {
    setShowTerm(!showTerm);
    setIsFlipped(false);
  };

  const handleReviewAgain = () => {
    const cardId = currentCard.id;
    setReviewCards(prev => new Set([...prev, cardId]));
    setMasteredCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    handleNext();
  };

  const handleGotIt = () => {
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
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Fireworks animation component
  const Fireworks = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            x: '50%',
            y: '50%',
            scale: 0,
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 100}%`,
            y: `${50 + (Math.random() - 0.5) * 100}%`,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-2xl"
          initial={{
            x: '50%',
            y: '50%',
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 80}%`,
            y: `${50 + (Math.random() - 0.5) * 80}%`,
            scale: [0, 1.5, 0],
            rotate: 360,
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );

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
              <h1 className="text-lg font-semibold">{quizSet.title}</h1>
              <p className="text-sm text-gray-400">
                {currentIndex + 1} of {quizSet.cards.length}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              
              <button
                onClick={toggleStartSide}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Start with: {showTerm ? 'Terms' : 'Definitions'}
              </button>
              
              <button 
                onClick={handleRestart}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-400">{notStudiedCount}</div>
              <div className="text-xs text-gray-400">Not studied</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">{reviewCount}</div>
              <div className="text-xs text-gray-400">Review again</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">{masteredCount}</div>
              <div className="text-xs text-gray-400">Mastered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
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
                <Fireworks />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    Congratulations!
                  </h3>
                  
                  <p className="text-green-100 mb-8 text-lg">
                    You've completed this study set! You mastered {masteredCount} out of {quizSet.cards.length} terms.
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      onClick={handleRestart}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                    >
                      Study Again
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
              // Regular Flashcard
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
                    className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700 shadow-2xl flex flex-col justify-center items-center p-12"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-center w-full">
                      <div className="flex items-center justify-center mb-6">
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wide mr-4">
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
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-700"
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
                      
                      <div className="text-gray-500">
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
              className="flex items-center space-x-3 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl transition-colors font-semibold shadow-lg"
            >
              <X className="h-6 w-6" />
              <span>Review Again</span>
            </motion.button>
            
            <motion.button
              onClick={handleGotIt}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl transition-colors font-semibold shadow-lg"
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
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>
            
            <div className="text-center">
              <div className="text-lg font-semibold mb-1">
                Card {currentIndex + 1} / {quizSet.cards.length}
              </div>
              <div className="text-sm text-gray-400">
                {Math.round((masteredCount / quizSet.cards.length) * 100)}% mastered
              </div>
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === quizSet.cards.length - 1 && !showCelebration}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentIndex === quizSet.cards.length - 1 && !showCelebration
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
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

export default FlashcardStudy;