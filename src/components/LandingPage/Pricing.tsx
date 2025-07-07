import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        'Create unlimited study sets',
        'Basic flashcard modes',
        'Mobile app access',
        'Community support',
        'Basic progress tracking'
      ],
      limitations: [
        'Limited to 3 study modes',
        'Basic analytics only',
        'No offline access'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      popular: false
    },
    {
      name: 'Plus',
      price: { monthly: 7.99, annual: 47.99 },
      description: 'For serious students',
      features: [
        'Everything in Free',
        'Advanced study modes',
        'Detailed progress analytics',
        'Offline study access',
        'Custom themes',
        'Priority support',
        'Export study sets',
        'Advanced scheduling'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      popular: true
    },
    {
      name: 'Premium',
      price: { monthly: 15.99, annual: 95.99 },
      description: 'For educators and teams',
      features: [
        'Everything in Plus',
        'Team collaboration',
        'Advanced analytics dashboard',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'Advanced integrations',
        'White-label options'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
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
            Choose your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> learning plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include our core features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Save 50%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular 
                  ? 'border-blue-500 transform scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-600">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>

                {isAnnual && plan.price.monthly > 0 && (
                  <p className="text-sm text-gray-500">
                    ${(plan.price.monthly * 12).toFixed(2)} billed annually
                  </p>
                )}
              </div>

              <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors mb-8 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations && (
                  <div className="pt-4 border-t border-gray-200">
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start text-sm text-gray-500">
                          <span className="mr-2">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <Zap className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Need something custom?</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            We offer enterprise solutions with custom features, dedicated support, and flexible pricing for large organizations.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Enterprise Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;