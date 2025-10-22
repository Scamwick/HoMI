'use client';

import React from 'react';

interface AssessmentInputs {
  income: number;
  expenses: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  creditScore: number;
  propertyPrice: number;
  deceptionDetected: boolean;
  stressLevel: number;
}

interface AssessmentFormProps {
  inputs: AssessmentInputs;
  setInputs: React.Dispatch<React.SetStateAction<AssessmentInputs>>;
}

export default function AssessmentForm({ inputs, setInputs }: AssessmentFormProps) {
  const handleChange = (field: keyof AssessmentInputs, value: string | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [field]: typeof value === 'boolean' ? value : parseFloat(value) || 0,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
      {/* Income */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Annual Income ($)
        </label>
        <input
          type="number"
          value={inputs.income}
          onChange={(e) => handleChange('income', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Monthly Expenses */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Monthly Expenses ($)
        </label>
        <input
          type="number"
          value={inputs.expenses}
          onChange={(e) => handleChange('expenses', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Down Payment */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Down Payment ($)
        </label>
        <input
          type="number"
          value={inputs.downPayment}
          onChange={(e) => handleChange('downPayment', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Property Price */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Property Price ($)
        </label>
        <input
          type="number"
          value={inputs.propertyPrice}
          onChange={(e) => handleChange('propertyPrice', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Loan Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Loan Amount ($)
        </label>
        <input
          type="number"
          value={inputs.loanAmount}
          onChange={(e) => handleChange('loanAmount', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Interest Rate (%)
        </label>
        <input
          type="number"
          step="0.01"
          value={inputs.interestRate * 100}
          onChange={(e) => handleChange('interestRate', (parseFloat(e.target.value) / 100).toString())}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Credit Score */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Credit Score (300-850)
        </label>
        <input
          type="number"
          value={inputs.creditScore}
          onChange={(e) => handleChange('creditScore', e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Stress Level */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Stress Level (1-5)
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={inputs.stressLevel}
          onChange={(e) => handleChange('stressLevel', e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Low</span>
          <span className="text-white font-medium">{inputs.stressLevel}</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
