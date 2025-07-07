import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Medical Student',
      university: 'Harvard Medical School',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'Quizlify completely transformed how I study for my medical exams. The spaced repetition algorithm helped me retain complex anatomy terms that I used to struggle with.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'High School Teacher',
      university: 'Lincoln High School',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'My students\' test scores improved by 23% after implementing Quizlify in our classroom. The collaborative features make learning engaging and fun.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Language Learner',
      university: 'Self-taught',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'Learning Japanese seemed impossible until I found Quizlify. The mobile app lets me practice during my commute, and I\'ve made incredible progress.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'Engineering Student',
      university: 'MIT',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'The analytics dashboard shows exactly where I need to focus my study time. It\'s like having a personal tutor that knows my weak spots.',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Nursing Student',
      university: 'Johns Hopkins',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'The practice test feature perfectly simulates real exam conditions. I felt so prepared for my NCLEX thanks to Quizlify\'s comprehensive study tools.',
      rating: 5
    },
    {
      name: 'Alex Rivera',
      role: 'Graduate Student',
      university: 'Stanford University',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'Research shows that active recall is the most effective study method, and Quizlify makes it effortless. My GPA has never been higher.',
      rating: 5
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
            Loved by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> millions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join students, teachers, and lifelong learners who trust Quizlify to achieve their goals.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-blue-500 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600">{testimonial.university}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted by learners worldwide
            </h3>
            <p className="text-lg text-gray-600">
              Our community continues to grow every day
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50M+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">500M+</div>
              <div className="text-gray-600">Study Sets Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">10B+</div>
              <div className="text-gray-600">Cards Studied</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;