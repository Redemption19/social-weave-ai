'use client'
import React from 'react';
import { Twitter, Linkedin, User, Star, History, Cloud } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const FeatureSection = () => {
  const features = [
    {
      icon: <Twitter size={48} />,
      title: 'AI-Powered Content Generation',
      description:
        'Generate engaging content for Twitter, Instagram, and LinkedIn effortlessly with our AI technology.',
    },
    {
      icon: <User size={48} />,
      title: 'User Authentication',
      description:
        'Manage user accounts securely with Clerk, ensuring a seamless login experience.',
    },
    {
      icon: <Star size={48} />,
      title: 'Points-Based System',
      description:
        'Earn points for content generation, unlocking features and rewards as you create.',
    },
    {
      icon: <History size={48} />,
      title: 'Content History',
      description:
        'Access your content history and regenerate previous posts with ease.',
    },
    {
      icon: <Cloud size={48} />,
      title: 'Preview Functionality',
      description:
        'Preview generated content before posting to ensure it meets your expectations.',
    },
    {
      icon: <Linkedin size={48} />,
      title: 'Integration with Google\'s Generative AI',
      description:
        'Leverage Google’s Generative AI (Gemini) for enhanced content creation capabilities.',
    },
  ];

  return (
    <div className="bg-gray-900 py-40">
      <Navbar /> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Centered Header */}
        <h2 className="text-3xl font-extrabold text-white mb-4">What Do You Get?</h2>
        <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition mb-8">
          Get Started
        </button>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center hover:bg-gradient-to-r from-blue-500 to-blue-700 transition duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 mb-4 transition duration-300 transform hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
