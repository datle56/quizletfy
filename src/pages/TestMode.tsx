import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { useQuizSets } from '../hooks/useQuizSets';

interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  type: 'multiple-choice' | 'true-false' | 'written';
}

const TestMode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizSets, loading } = useQuizSets();
  const { isDarkMode } = useThemeStore();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeLimit] = useState<number>(10 * 60 * 1000); // 10 minutes

  if (loading) {
    return <LoadingSpinner />;
  }

  const quizSet = quizSets.find(set => set.id === id);

  if (!quizSet) {
    return <NotFound />;
  }

  // Generate questions from quiz set
  useEffect(() => {
    if (quizSet) {
      const generatedQuestions: Question[] = [];
      
      quizSet.cards.forEach((card, index) => {
        // Multiple choice question
        const wrongAnswers = quizSet.cards
          .filter(c => c.id !== card.id)
          .map(c => c.definition)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        const options = [card.definition, ...wrongAnswers].sort(() => Math.random() - 0.5);
        
        generatedQuestions.push({
          id: `mc-${card.id}`,
          question: `What is the definition of "${card.term}"?`,
          correctAnswer: card.definition,
          options,
          type: 'multiple-choice'
        });

        // True/False question
        const isCorrect = Math.random() > 0.5;
        const wrongDefinition = wrongAnswers[0] || 'This is incorrect';
        
        generatedQuestions.push({
          id: `tf-${card.id}`,
          question: `True or False: "${card.term}" means "${isCorrect ? card.definition : wrongDefinition}"`,
          correctAnswer: isCorrect ? 'True' : 'False',
          options: ['True', 'False'],
          type: 'true-false'
        });
      });
      
      // Shuffle and limit to 10 questions
      const shuffledQuestions = generatedQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
      setQuestions(shuffledQuestions);
    }
  }, [quizSet]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testStarted && !showResults) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setCurrentTime(elapsed);
        
        if (elapsed >= timeLimit) {
          handleFinishTest();
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [testStarted, showResults, startTime, timeLimit]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const timeRemaining = Math.max(0, timeLimit - currentTime);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
    setStartTime(Date.now());
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer
      }));
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
      } else {
        handleFinishTest();
      }
    }
  };

  const handleFinishTest = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setUserAnswers({});
    setShowResults(false);
    setTestStarted(false);
    setCurrentTime(0);
  };

  const handleBack = () => {
    navigate(`/app/quiz/${id}`);
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50 text-gray-900';
  
  const headerClasses = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  const cardClasses = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  if (questions.length === 0) {
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
                <Target className="h-5 w-5 text-purple-500" />
                <h1 className="text-lg font-semibold">Test Mode</h1>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {quizSet.title}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {testStarted && !showResults && (
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span className="font-mono text-lg">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
              
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
          {testStarted && !showResults && (
            <div className="mt-4">
              <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!testStarted ? (
            // Test Start Screen
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className={`rounded-2xl p-8 border ${cardClasses} max-w-2xl mx-auto`}>
                <Target className="h-16 w-16 text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Ready for your test?</h2>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  You'll have {formatTime(timeLimit)} to answer {questions.length} questions about {quizSet.title}.
                </p>
                
                <div className={`rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2">Test Format:</h3>
                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• Multiple choice questions</li>
                    <li>• True/False questions</li>
                    <li>• {formatTime(timeLimit)} time limit</li>
                    <li>• Immediate results after completion</li>
                  </ul>
                </div>
                
                <button
                  onClick={handleStartTest}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Start Test
                </button>
              </div>
            </motion.div>
          ) : showResults ? (
            // Results Screen
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className={`rounded-2xl p-8 border ${cardClasses} max-w-2xl mx-auto`}>
                {(() => {
                  const score = calculateScore();
                  const isGoodScore = score.percentage >= 70;
                  return (
                    <>
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                        isGoodScore ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {isGoodScore ? (
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        ) : (
                          <XCircle className="h-10 w-10 text-red-600" />
                        )}
                      </div>
                      
                      <h2 className="text-3xl font-bold mb-4">
                        {isGoodScore ? 'Great Job!' : 'Keep Studying!'}
                      </h2>
                      
                      <div className="text-6xl font-bold mb-4">
                        <span className={isGoodScore ? 'text-green-600' : 'text-red-600'}>
                          {score.percentage}%
                        </span>
                      </div>
                      
                      <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        You got {score.correct} out of {score.total} questions correct
                      </p>
                      
                      <div className={`rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="text-sm space-y-2">
                          <div>Time taken: {formatTime(currentTime)}</div>
                          <div>Average per question: {formatTime(currentTime / questions.length)}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={handleRestart}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                          Retake Test
                        </button>
                        <button
                          onClick={handleBack}
                          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            isDarkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                          }`}
                        >
                          Back to Set
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          ) : (
            // Question Screen
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-3xl mx-auto"
            >
              <div className={`rounded-2xl p-8 border ${cardClasses}`}>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === option
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : isDarkMode
                            ? 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600'
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === option
                            ? 'border-purple-500 bg-purple-500'
                            : isDarkMode ? 'border-gray-500' : 'border-gray-300'
                        }`}>
                          {selectedAnswer === option && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      selectedAnswer
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestMode;