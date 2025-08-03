export interface User {
  id: string;
  email: string;
  name?: string;
  provisionalLevel: 3 | 4 | 5 | 6;
  subscription: {
    plan: 'free' | 'monthly' | 'annual' | 'lifetime';
    status: 'active' | 'canceled' | 'pending';
    expiresAt: Date;
  };
  studyStreak: number;
  totalTestsTaken: number;
  averageScore: number;
}

export interface Question {
  id: string;
  level: 3 | 4 | 5 | 6;
  section: 'Listening' | 'Reading' | 'Writing';
  type: 'multiple_choice' | 'fill_blank' | 'true_false';
  question: string;
  questionChinese?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MockTest {
  id: string;
  title: string;
  level: 3 | 4 | 5 | 6;
  questions: Question[];
  timeLimit: number; // minutes
  sections: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  totalQuestions: number;
}

export interface TestResult {
  id: string;
  mockTestId: string;
  score: {
    total: number;
    bySection: Record<string, number>;
    percentage: number;
    passed: boolean;
  };
  answers: Record<string, any>;
  timeSpent: number;
  completedAt: Date;
}

export interface PlacementQuizResult {
  estimatedLevel: 3 | 4 | 5 | 6;
  confidence: number;
  strongAreas: string[];
  weakAreas: string[];
  recommendation: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual' | 'lifetime';
  features: string[];
  popular?: boolean;
}