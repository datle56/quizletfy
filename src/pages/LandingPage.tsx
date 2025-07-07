import React from 'react';
import LandingHeader from '../components/LandingPage/LandingHeader';
import Hero from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import Testimonials from '../components/LandingPage/Testimonials';
import Pricing from '../components/LandingPage/Pricing';
import CTA from '../components/LandingPage/CTA';
import Footer from '../components/LandingPage/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;