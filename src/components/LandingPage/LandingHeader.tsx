import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navigation = [
    { name: 'Features', href: '#features' },
    { 
      name: 'Products', 
      href: '#products',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Flashcards', href: '#flashcards' },
        { name: 'Practice Tests', href: '#tests' },
        { name: 'Study Guides', href: '#guides' },
        { name: 'Mobile App', href: '#mobile' }
      ]
    },
    { name: 'Pricing', href: '#pricing' },
    { name: 'For Teachers', href: '#teachers' },
    { name: 'Help', href: '#help' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Quizlify</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {isProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign up free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;