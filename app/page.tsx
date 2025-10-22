'use client';

import React, { useState } from 'react';
import {
  Home,
  ArrowRight,
  ArrowLeft,
  Target,
  BarChart3,
} from 'lucide-react';

export default function HomePage() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to HōMI',
      description:
        'Your personalized homebuying and financial wellness companion.',
      icon: <Home className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: 'Track Your Financial Journey',
      description:
        'Get insights, budgets, and simulations to plan your home purchase.',
      icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: 'Visualize Your Path',
      description:
        'We’ll guide you through affordability, readiness, and next steps.',
      icon: <Target className="w-8 h-8 text-indigo-500" />,
    },
  ];

  const nextStep = () => setStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setStep((prev) => (prev - 1 + steps.length) % steps.length);

  const { title, description, icon } = steps[step];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <div className="flex justify-center mb-4">{icon}</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevStep}
            className="flex items-center text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>

          <button
            onClick={nextStep}
            className="flex items-center text-sm px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
          >
            Next <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="mt-6 flex justify-center space-x-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === step ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Built with ❤️ by <span className="font-medium text-indigo-500">HōMI</span>
      </footer>
    </main>
  );
}
