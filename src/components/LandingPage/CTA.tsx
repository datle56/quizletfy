import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to transform your learning?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Join millions of students who are already studying smarter, not harder. 
            Start your free account today and experience the difference.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-10"
          >
            <div className="flex items-center space-x-2 text-white/90">
              <Zap className="h-5 w-5" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Sparkles className="h-5 w-5" />
              <span>Setup in 30 seconds</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-lg">
              <span>Start Learning for Free</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule a Demo
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="text-white/70 mb-6">Trusted by students at top universities</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="text-white font-semibold">Harvard</div>
              <div className="text-white font-semibold">MIT</div>
              <div className="text-white font-semibold">Stanford</div>
              <div className="text-white font-semibold">Oxford</div>
              <div className="text-white font-semibold">Cambridge</div>
              <div className="text-white font-semibold">Yale</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;