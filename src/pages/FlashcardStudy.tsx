import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
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

  if (loading) {
    return <LoadingSpinner />;
  }

  const quizSet = quizSets.find(set => set.id === id);

  if (!quizSet) {
    return <NotFound />;
  }

  const currentCard = quizSet.cards[currentIndex];
  const progress = ((currentIndex + 1) / quizSet.cards.length) * 100;

  const handleNext = () => {
    if (currentIndex < quizSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleStartSide = () => {
    setShowTerm(!showTerm);
    setIsFlipped(false);
  };

  const handleBack = () => {
    navigate(`/app/quiz/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">{quizSet.title}</h1>
              <p className="text-sm text-gray-500">
                {currentIndex + 1} of {quizSet.cards.length}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleStartSide}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Start with: {showTerm ? 'Terms' : 'Definitions'}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-3xl">
            <div
              className={`bg-white rounded-xl shadow-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                isFlipped ? 'transform scale-105' : ''
              }`}
              onClick={handleFlip}
            >
              <div className="p-12 text-center min-h-[300px] flex flex-col justify-center">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {isFlipped ? (showTerm ? 'Definition' : 'Term') : (showTerm ? 'Term' : 'Definition')}
                  </span>
                </div>
                
                <div className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed">
                  {isFlipped 
                    ? (showTerm ? currentCard.definition : currentCard.term)
                    : (showTerm ? currentCard.term : currentCard.definition)
                  }
                </div>
                
                <div className="mt-8 text-gray-400">
                  <p className="text-sm">Click to flip</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restart</span>
            </button>
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === quizSet.cards.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentIndex === quizSet.cards.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Study complete */}
        {currentIndex === quizSet.cards.length - 1 && isFlipped && (
          <div className="mt-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Great job! You've completed this study set.
              </h3>
              <p className="text-green-700 mb-4">
                You've reviewed all {quizSet.cards.length} terms.
              </p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Study Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardStudy;