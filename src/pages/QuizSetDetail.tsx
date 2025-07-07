import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Shuffle, BookOpen, Target, BarChart3 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { useQuizSets } from '../hooks/useQuizSets';

const QuizSetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizSets, loading } = useQuizSets();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className={`h-1 ${quizSet.color} rounded-full mb-4`}></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{quizSet.title}</h1>
            <p className="text-gray-600 mb-4">{quizSet.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="font-medium text-gray-700">{quizSet.termCount} terms</span>
              <span>Created by {quizSet.creator}</span>
              <span>{new Date(quizSet.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Study Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={handleStudyFlashcards}
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Play className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Flashcards</p>
                <p className="text-sm opacity-90">Study with flashcards</p>
              </div>
            </div>
          </button>
          
          <button className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Learn</p>
                <p className="text-sm opacity-90">Adaptive learning mode</p>
              </div>
            </div>
          </button>
          
          <button className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6" />
              <div className="text-left">
                <p className="font-semibold">Test</p>
                <p className="text-sm opacity-90">Practice test mode</p>
              </div>
            </div>
          </button>
        </div>

        {/* Terms List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Terms in this set ({quizSet.termCount})
              </h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Shuffle className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <BarChart3 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {quizSet.cards.map((card, index) => (
              <div key={card.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900 mb-1">{card.term}</p>
                      <p className="text-sm text-gray-500">Term</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-1">{card.definition}</p>
                      <p className="text-sm text-gray-500">Definition</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSetDetail;