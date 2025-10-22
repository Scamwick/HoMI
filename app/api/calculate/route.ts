import { NextResponse } from 'next/server';

interface CalculateRequest {
  income: number;
  expenses: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  creditScore: number;
  propertyPrice: number;
  stressLevel: number;
}

export async function POST(request: Request) {
  try {
    const body: CalculateRequest = await request.json();

    // Basic validation
    if (!body.income || !body.propertyPrice || !body.loanAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate HōMI Score (simplified version for API)
    const score = calculateScore(body);

    // Calculate affordability
    const affordability = calculateAffordability(body);

    // Generate recommendations
    const recommendations = generateRecommendations(body, score);

    return NextResponse.json({
      score,
      affordability,
      recommendations,
      breakdown: {
        financial: calculateFinancialScore(body),
        emotional: calculateEmotionalScore(body),
      },
    });
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate score' },
      { status: 500 }
    );
  }
}

function calculateScore(data: CalculateRequest): number {
  const financial = calculateFinancialScore(data);
  const emotional = calculateEmotionalScore(data);

  return Math.round(financial * 0.7 + emotional * 0.3);
}

function calculateFinancialScore(data: CalculateRequest): number {
  let score = 0;

  // DTI Ratio
  const monthlyIncome = data.income / 12;
  const monthlyPayment = calculateMonthlyPayment(
    data.loanAmount,
    data.interestRate,
    30 * 12
  );
  const dti = (monthlyPayment + data.expenses) / monthlyIncome;

  if (dti <= 0.28) score += 30;
  else if (dti <= 0.36) score += 20;
  else if (dti <= 0.43) score += 10;

  // Down Payment
  const downPaymentPercent = (data.downPayment / data.propertyPrice) * 100;

  if (downPaymentPercent >= 20) score += 25;
  else if (downPaymentPercent >= 10) score += 15;
  else if (downPaymentPercent >= 5) score += 10;
  else score += 5;

  // Credit Score
  if (data.creditScore >= 740) score += 25;
  else if (data.creditScore >= 670) score += 18;
  else if (data.creditScore >= 580) score += 10;
  else score += 5;

  // Emergency Fund (simplified)
  const emergencyMonths = (data.downPayment * 0.1) / data.expenses;

  if (emergencyMonths >= 6) score += 20;
  else if (emergencyMonths >= 3) score += 12;
  else if (emergencyMonths >= 1) score += 6;

  return Math.min(score, 100);
}

function calculateEmotionalScore(data: CalculateRequest): number {
  let score = 100;

  // Stress level impact
  const stressPenalty = (data.stressLevel - 1) * 10;
  score -= stressPenalty;

  // Affordability comfort
  const monthlyIncome = data.income / 12;
  const monthlyPayment = calculateMonthlyPayment(
    data.loanAmount,
    data.interestRate,
    30 * 12
  );
  const housingRatio = monthlyPayment / monthlyIncome;

  if (housingRatio > 0.35) {
    score -= 20;
  } else if (housingRatio > 0.28) {
    score -= 10;
  }

  return Math.max(score, 0);
}

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 12;
  if (monthlyRate === 0) return principal / months;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

function calculateAffordability(data: CalculateRequest) {
  const monthlyIncome = data.income / 12;
  const maxMonthlyPayment = monthlyIncome * 0.28;
  const monthlyRate = data.interestRate / 12;
  const months = 30 * 12;

  const maxLoan =
    maxMonthlyPayment *
    ((1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate);

  const maxPrice = maxLoan + data.downPayment;

  return {
    maxPrice: Math.round(maxPrice),
    maxMonthlyPayment: Math.round(maxMonthlyPayment),
    currentMonthlyPayment: Math.round(
      calculateMonthlyPayment(data.loanAmount, data.interestRate, months)
    ),
  };
}

function generateRecommendations(
  data: CalculateRequest,
  score: number
): string[] {
  const recommendations: string[] = [];

  if (score >= 80) {
    recommendations.push("You're in a strong position to buy!");
    recommendations.push('Consider locking in your interest rate');
    recommendations.push('Start house hunting with confidence');
  } else if (score >= 60) {
    recommendations.push("You're close! A few improvements will help");
    if (data.creditScore < 740) {
      recommendations.push('Work on improving your credit score');
    }
    if ((data.downPayment / data.propertyPrice) < 0.2) {
      recommendations.push('Save for a larger down payment to avoid PMI');
    }
  } else if (score >= 40) {
    recommendations.push('Take time to strengthen your finances');
    recommendations.push('Build your emergency fund');
    recommendations.push('Pay down high-interest debt');
  } else {
    recommendations.push('Focus on financial foundation first');
    recommendations.push('Create a budget and savings plan');
    recommendations.push('Consider financial counseling');
  }

  return recommendations;
}
