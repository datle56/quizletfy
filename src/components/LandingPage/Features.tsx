import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  BarChart3, 
  Smartphone,
  BookOpen,
  Trophy,
  Clock
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI-powered spaced repetition adapts to your learning pace and helps you remember more effectively.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create and study flashcards in seconds. Our streamlined interface keeps you focused on learning.',
      color: 'bg-yellow-500'
    },
    {
      icon: Target,
      title: 'Targeted Practice',
      description: 'Focus on your weak areas with intelligent practice modes that adapt to your performance.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Share study sets with classmates and learn together with real-time collaboration features.',
      color: 'bg-green-500'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Track your learning progress with detailed analytics and insights into your study habits.',
      color: 'bg-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Study Anywhere',
      description: 'Access your study materials on any device, online or offline. Learn on the go.',
      color: 'bg-indigo-500'
    }
  ];

  const studyModes = [
    {
      icon: BookOpen,
      title: 'Flashcards',
      description: 'Classic flashcard experience with customizable study modes'
    },
    {
      icon: Trophy,
      title: 'Practice Tests',
      description: 'Simulate real exams with timed practice tests'
    },
    {
      icon: Clock,
      title: 'Speed Review',
      description: 'Quick review sessions for last-minute studying'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to make studying more effective, efficient, and enjoyable.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Study Modes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Multiple ways to study
            </h3>
            <p className="text-lg text-gray-600">
              Choose the study mode that works best for you and your learning style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studyModes.map((mode, index) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <mode.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{mode.title}</h4>
                <p className="text-gray-600">{mode.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;