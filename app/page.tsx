'use client';

import React, { useState } from 'react';
import AssessmentForm from '../components/AssessmentForm';
import ThresholdCompass from '../components/ThresholdCompass';
import { Home, ArrowRight, ArrowLeft, Target, BarChart3, Check } from 'lucide-react';
import { calculateHomiScore } from '../lib/homiScore';

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [inputs, setInputs] = useState({
    income: 100000,
    expenses: 2000,
    downPayment: 60000,
    loanAmount: 340000,
    interestRate: 0.07,
    creditScore: 750,
    propertyPrice: 400000,
    deceptionDetected: false,
    stressLevel: 2,
  });

  const steps = [
    {
      title: 'Welcome to HōMI',
      description: 'Unlock Your Home\'s True Potential',
      icon: <Home className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: 'Financial Assessment',
      description: '70% weight on affordability & stability',
      icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
    },
    {
      title: 'Readiness Analysis',
      description: '30% weight on emotional & practical fit',
      icon: <Target className="w-8 h-8 text-indigo-500" />,
    },
  ];

  const nextStep = () => setStep((prev) => (prev + 1) % steps.length);
  const prevStep = () =>
    setStep((prev) => (prev - 1 + steps.length) % steps.length);

  const { title, description, icon } = steps[step];

  const handleCalculate = () => {
    const res = calculateHomiScore(inputs);
    setResult(res);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full mx-auto text-center">
        {/* Header */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          HōMI
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Your AI-Powered Home Buying Companion
        </p>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-center mb-6">{icon}</div>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-300 mb-8">{description}</p>

          {/* Step Content */}
          {step === 0 && (
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-400" />
                  Financial Simulation (70%)
                </h3>
                <p className="text-gray-300">
                  Monte Carlo simulations analyze your debt-to-income ratio,
                  credit score, down payment, and long-term affordability.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-400" />
                  Emotional Readiness (30%)
                </h3>
                <p className="text-gray-300">
                  AI-powered analysis evaluates your stress levels, life
                  stability, and psychological preparedness for homeownership.
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <AssessmentForm inputs={inputs} setInputs={setInputs} />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center">
              <button
                onClick={handleCalculate}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-4 rounded-xl font-bold text-white text-lg shadow-lg transform hover:scale-105 transition-all mb-8"
              >
                Calculate My HōMI Score
              </button>

              {result && (
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 w-full max-w-2xl border border-white/30">
                  <ThresholdCompass score={result.score} />

                  <div className="mt-6 text-left">
                    <h3 className="text-2xl font-bold mb-2">
                      Decision: <span className="capitalize">{result.decision}</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-4 my-6">
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm text-gray-300">Financial</p>
                        <p className="text-3xl font-bold">{result.breakdown.financial}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm text-gray-300">Emotional</p>
                        <p className="text-3xl font-bold">{result.breakdown.emotional}</p>
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold mb-4">Your Playbook:</h4>
                    <ul className="space-y-3">
                      {result.playbook.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-200">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-center space-x-6 mt-8">
            <button
              onClick={prevStep}
              className="flex items-center text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>

            <span className="text-sm text-gray-400 self-center">
              Step {step + 1} of {steps.length}
            </span>

            <button
              onClick={nextStep}
              className="flex items-center text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Next <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step
                  ? 'bg-indigo-500 w-8'
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-gray-400 text-sm">
          <p>
            Powered by AI · Monte Carlo Simulations · Behavioral Analysis
          </p>
          <p className="mt-2">
            Built with ❤️ by{' '}
            <span className="font-medium text-indigo-400">HōMI Team</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
