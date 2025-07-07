import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Flashcards', href: '#flashcards' },
        { name: 'Practice Tests', href: '#tests' },
        { name: 'Study Guides', href: '#guides' },
        { name: 'Mobile App', href: '#mobile' },
        { name: 'API', href: '#api' }
      ]
    },
    {
      title: 'For Students',
      links: [
        { name: 'Study Tips', href: '#tips' },
        { name: 'Success Stories', href: '#stories' },
        { name: 'Student Discount', href: '#discount' },
        { name: 'Campus Ambassadors', href: '#ambassadors' },
        { name: 'Scholarships', href: '#scholarships' }
      ]
    },
    {
      title: 'For Teachers',
      links: [
        { name: 'Classroom Tools', href: '#classroom' },
        { name: 'Teacher Resources', href: '#resources' },
        { name: 'Professional Development', href: '#development' },
        { name: 'School Solutions', href: '#schools' },
        { name: 'Webinars', href: '#webinars' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press', href: '#press' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Community', href: '#community' },
        { name: 'Status', href: '#status' },
        { name: 'Security', href: '#security' },
        { name: 'Privacy', href: '#privacy' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#facebook' },
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
    { name: 'Instagram', icon: Instagram, href: '#instagram' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
    { name: 'YouTube', icon: Youtube, href: '#youtube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Quizlify</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering millions of students worldwide to achieve their learning goals through 
              innovative study tools and collaborative learning experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay updated</h3>
              <p className="text-gray-400">
                Get the latest study tips, product updates, and educational content delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <p className="text-gray-400">
              © 2024 Quizlify. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Available in:</span>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>Tiếng Việt</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;