import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  BookOpen, 
  Target, 
  Shuffle, 
  Star, 
  Share2, 
  Volume2,
  User,
  Calendar,
  BarChart3,
  Trophy,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { useQuizSets } from '../hooks/useQuizSets';

const QuizSetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizSets, loading } = useQuizSets();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  const quizSet = quizSets.find(set => set.id === id);

  if (!quizSet) {
    return <NotFound />;
  }

  const handleBack = () => {
    navigate('/app');
  };

  const handleStudyFlashcards = () => {
    navigate(`/app/quiz/${id}/flashcards`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  const studyModes = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      subtitle: 'Thẻ ghi nhớ',
      description: 'Study with interactive flashcards',
      icon: Play,
      color: 'from-blue-500 to-blue-600',
      action: handleStudyFlashcards
    },
    {
      id: 'learn',
      title: 'Learn',
      subtitle: 'Tự học',
      description: 'Adaptive learning mode',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      action: () => console.log('Learn mode')
    },
    {
      id: 'test',
      title: 'Test',
      subtitle: 'Kiểm tra',
      description: 'Practice test mode',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      action: () => console.log('Test mode')
    },
    {
      id: 'match',
      title: 'Match',
      subtitle: 'Ghép thẻ',
      description: 'Match terms with definitions',
      icon: Shuffle,
      color: 'from-pink-500 to-pink-600',
      action: () => console.log('Match mode')
    }
  ];

  const currentCard = quizSet.cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / quizSet.cards.length) * 100;

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex < quizSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReviewAgain = () => {
    // Logic for marking card as needs review
    handleNextCard();
  };

  const handleGotIt = () => {
    // Logic for marking card as mastered
    handleNextCard();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorited 
                    ? 'text-yellow-400 bg-yellow-400/10' 
                    : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                }`}
              >
                <Star className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`h-1 ${quizSet.color} rounded-full mb-6 mx-auto max-w-md`}></div>
            <h1 className="text-4xl font-bold mb-3">{quizSet.title}</h1>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">{quizSet.description}</p>
            
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium text-white">{quizSet.termCount}</span>
                <span>terms</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Created by {quizSet.creator}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(quizSet.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Study Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Choose your study mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyModes.map((mode, index) => (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={mode.action}
                className="group relative overflow-hidden bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700 hover:border-gray-600"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <mode.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1">{mode.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{mode.subtitle}</p>
                  <p className="text-xs text-gray-500">{mode.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Flashcard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Preview Flashcards</h2>
            <div className="text-gray-400">
              Card {currentCardIndex + 1} / {quizSet.cards.length}
            </div>
          </div>

          {/* Flashcard */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl">
              <motion.div
                className="relative h-80 cursor-pointer"
                onClick={handleCardFlip}
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
                    className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl flex flex-col justify-center items-center p-8"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-wide mr-3">
                          {isFlipped ? 'Definition' : 'Term'}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <Volume2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="text-3xl font-medium mb-6 leading-relaxed">
                        {isFlipped ? currentCard.definition : currentCard.term}
                      </div>
                      
                      <div className="text-gray-500">
                        <p className="text-sm">Click to flip</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Card Controls */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <button
              onClick={handleReviewAgain}
              className="flex items-center space-x-3 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl transition-colors font-semibold"
            >
              <span className="text-2xl">✗</span>
              <span>Review Again</span>
            </button>
            
            <button
              onClick={handleGotIt}
              className="flex items-center space-x-3 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl transition-colors font-semibold"
            >
              <span className="text-2xl">✓</span>
              <span>Got It</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentCardIndex === 0
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={handleNextCard}
              disabled={currentCardIndex === quizSet.cards.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentCardIndex === quizSet.cards.length - 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>Next</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </button>
          </div>
        </motion.div>

        {/* Progress & Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          {/* Mastery Progress */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Mastery Progress</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <Trophy className="h-5 w-5" />
                <span>0% mastered</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400">0</div>
                <div className="text-sm text-gray-400">Not studied</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">0</div>
                <div className="text-sm text-gray-400">Familiar</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">0</div>
                <div className="text-sm text-gray-400">Mastered</div>
              </div>
            </div>
          </div>

          {/* Terms List */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  Terms in this set ({quizSet.termCount})
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Shuffle className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <BarChart3 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-700">
              {quizSet.cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-300">
                      {index + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-medium text-white">{card.term}</p>
                          <button className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-400">Term</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="text-gray-300">{card.definition}</p>
                          <button className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-400">Definition</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizSetDetail;