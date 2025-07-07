import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, BookOpen, Trophy } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">Trusted by 50M+ students</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Study with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Confidence</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Master any subject with flashcards, practice tests, and expert-created content. 
              Join millions of students achieving their learning goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-lg">
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">50M+</span>
                </div>
                <p className="text-gray-600">Active Students</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">500M+</span>
                </div>
                <p className="text-gray-600">Study Sets</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span className="text-2xl font-bold text-gray-900">95%</span>
                </div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full"></div>
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-500 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-green-500 rounded-full"></div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Spanish Vocabulary</span>
                  <span className="text-blue-600 font-medium">24 terms</span>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-center">
                  <h3 className="text-xl font-bold mb-2">¿Cómo estás?</h3>
                  <p className="opacity-90">Click to reveal answer</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-100 text-green-700 py-3 rounded-lg font-medium hover:bg-green-200 transition-colors">
                    Easy
                  </button>
                  <button className="flex-1 bg-yellow-100 text-yellow-700 py-3 rounded-lg font-medium hover:bg-yellow-200 transition-colors">
                    Good
                  </button>
                  <button className="flex-1 bg-red-100 text-red-700 py-3 rounded-lg font-medium hover:bg-red-200 transition-colors">
                    Hard
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;