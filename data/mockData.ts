import { Question, MockTest, SubscriptionPlan, User } from '@/types';

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Alex Chen',
  provisionalLevel: 4,
  subscription: {
    plan: 'free',
    status: 'active',
    expiresAt: new Date('2024-12-31'),
  },
  studyStreak: 5,
  totalTestsTaken: 12,
  averageScore: 75,
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 5,
    period: 'monthly',
    features: [
      'Unlimited mock tests',
      'AI-powered insights',
      'Progress tracking',
      'All HSK levels (3-6)',
      'Email support',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 29,
    period: 'annual',
    popular: true,
    features: [
      'Everything in Monthly',
      '50% cost savings',
      'Priority support',
      'Advanced analytics',
      'Study plan generator',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 69,
    period: 'lifetime',
    features: [
      'Everything in Annual',
      'One-time payment',
      'Future updates included',
      'Premium support',
      'Early access to new features',
    ],
  },
];

export const placementQuestions: Question[] = [
  {
    id: 'p1',
    level: 3,
    section: 'Reading',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'What does "你好" mean?',
    questionChinese: '你好',
    options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
    correctAnswer: 0,
    explanation: '"你好" is the most common greeting in Chinese, meaning "Hello".',
  },
  {
    id: 'p2',
    level: 3,
    section: 'Reading',
    type: 'multiple_choice',
    difficulty: 'easy',
    question: 'Which character means "water"?',
    options: ['火', '水', '土', '风'],
    correctAnswer: 1,
    explanation: '"水" (shuǐ) means water in Chinese.',
  },
  {
    id: 'p3',
    level: 4,
    section: 'Reading',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'Complete the sentence: 我______去图书馆。',
    questionChinese: '我______去图书馆。',
    options: ['想', '要', '应该', '能'],
    correctAnswer: 0,
    explanation: '"想" (xiǎng) means "want to" and fits best in this context.',
  },
  {
    id: 'p4',
    level: 4,
    section: 'Reading',
    type: 'multiple_choice',
    difficulty: 'medium',
    question: 'What is the meaning of "环境"?',
    questionChinese: '环境',
    options: ['Environment', 'Development', 'Government', 'Movement'],
    correctAnswer: 0,
    explanation: '"环境" (huánjìng) means environment.',
  },
  {
    id: 'p5',
    level: 5,
    section: 'Reading',
    type: 'multiple_choice',
    difficulty: 'hard',
    question: 'Choose the most appropriate word: 这个决定对公司的发展很______。',
    questionChinese: '这个决定对公司的发展很______。',
    options: ['重要', '严重', '轻松', '简单'],
    correctAnswer: 0,
    explanation: '"重要" (zhòngyào) means important, which fits the context best.',
  },
];

export const mockTests: MockTest[] = [
  {
    id: 'hsk3-1',
    title: 'HSK 3 Practice Test 1',
    level: 3,
    difficulty: 'easy',
    timeLimit: 65,
    sections: ['Reading', 'Writing'],
    totalQuestions: 30,
    questions: [
      {
        id: 'q1',
        level: 3,
        section: 'Reading',
        type: 'multiple_choice',
        difficulty: 'easy',
        question: 'Choose the correct answer: 我每天______七点起床。',
        questionChinese: '我每天______七点起床。',
        options: ['在', '从', '到', '对'],
        correctAnswer: 0,
        explanation: '"在" is used to indicate time in this context.',
      },
      {
        id: 'q2',
        level: 3,
        section: 'Reading',
        type: 'multiple_choice',
        difficulty: 'easy',
        question: 'What does "学校" mean?',
        questionChinese: '学校',
        options: ['Hospital', 'School', 'Restaurant', 'Store'],
        correctAnswer: 1,
        explanation: '"学校" (xuéxiào) means school.',
      },
    ],
  },
  {
    id: 'hsk4-1',
    title: 'HSK 4 Practice Test 1',
    level: 4,
    difficulty: 'medium',
    timeLimit: 105,
    sections: ['Listening', 'Reading', 'Writing'],
    totalQuestions: 45,
    questions: [
      {
        id: 'q3',
        level: 4,
        section: 'Reading',
        type: 'multiple_choice',
        difficulty: 'medium',
        question: 'Choose the best answer: 他的______很好，说话很清楚。',
        questionChinese: '他的______很好，说话很清楚。',
        options: ['声音', '声响', '响声', '音响'],
        correctAnswer: 0,
        explanation: '"声音" (shēngyīn) means voice, which fits best here.',
      },
    ],
  },
];

export const mockTestResults = [
  {
    id: 'result1',
    mockTestId: 'hsk3-1',
    score: {
      total: 25,
      bySection: { Reading: 20, Writing: 15 },
      percentage: 83,
      passed: true,
    },
    answers: { q1: 0, q2: 1 },
    timeSpent: 45,
    completedAt: new Date('2024-01-15T10:30:00Z'),
  },
];

export const aiInsights = [
  {
    weakness: 'Time Management',
    description: 'You spent too much time on reading comprehension questions.',
    tip: 'Practice skimming techniques and allocate specific time limits per question type.',
  },
  {
    weakness: 'Vocabulary Range',
    description: 'Some advanced vocabulary questions were challenging.',
    tip: 'Focus on learning 10 new words daily using spaced repetition.',
  },
  {
    weakness: 'Grammar Patterns',
    description: 'Complex sentence structures need more practice.',
    tip: 'Review grammar patterns and practice with similar sentence structures.',
  },
];