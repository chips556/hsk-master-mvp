import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { Timer } from '@/components/ui/Timer';
import { Colors, Spacing } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { placementQuestions } from '@/data/mockData';
import { Question, PlacementQuizResult } from '@/types';

export default function PlacementQuizScreen() {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLimit] = useState(15 * 60); // 15 minutes

  const currentQuestion = placementQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / placementQuestions.length) * 100;

  const handleAnswer = (answer: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < placementQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = (): PlacementQuizResult => {
    let correctAnswers = 0;
    let levelScores = { 3: 0, 4: 0, 5: 0, 6: 0 };

    placementQuestions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
        levelScores[question.level]++;
      }
    });

    // Determine estimated level based on performance
    let estimatedLevel: 3 | 4 | 5 | 6 = 3;
    let maxScore = levelScores[3];

    Object.entries(levelScores).forEach(([level, score]) => {
      if (score > maxScore) {
        maxScore = score;
        estimatedLevel = parseInt(level) as 3 | 4 | 5 | 6;
      }
    });

    const totalQuestions = placementQuestions.length;
    const accuracy = correctAnswers / totalQuestions;

    return {
      estimatedLevel,
      confidence: Math.round(accuracy * 100),
      strongAreas: ['Reading Comprehension'],
      weakAreas: accuracy < 0.7 ? ['Vocabulary', 'Grammar'] : [],
      recommendation: `Based on your performance, we recommend starting with HSK ${estimatedLevel} preparation.`,
    };
  };

  const completeQuiz = () => {
    const results = calculateResults();
    dispatch({ type: 'SET_PLACEMENT_RESULT', payload: results });
    setIsCompleted(true);
    router.push('/placement-results');
  };

  const handleTimeExpire = () => {
    Alert.alert(
      'Time\'s Up!',
      'The placement quiz time has expired. Your current answers will be submitted.',
      [{ text: 'OK', onPress: completeQuiz }]
    );
  };

  const isAnswered = currentQuestion && answers.hasOwnProperty(currentQuestion.id);

  return (
    <View style={styles.container} testID="placement-quiz-container">
      {/* Header */}
      <View style={styles.header} testID="quiz-header">
        <View style={styles.headerTop}>
          <Text style={styles.title}>Placement Quiz</Text>
          <Timer
            duration={timeLimit}
            onExpire={handleTimeExpire}
            warningThresholds={[300, 60]}
            testID="quiz-timer"
          />
        </View>
        <ProgressBar percentage={progress} height={6} testID="quiz-progress" />
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {placementQuestions.length}
        </Text>
      </View>

      {/* Question */}
      <ScrollView style={styles.content} testID="quiz-content">
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={placementQuestions.length}
            testID="current-question"
          />
        )}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation} testID="quiz-navigation">
        <Button
          title="Previous"
          onPress={handlePrevious}
          variant="outline"
          size="md"
          disabled={currentQuestionIndex === 0}
          testID="previous-button"
        />
        <Button
          title={currentQuestionIndex === placementQuestions.length - 1 ? 'Finish' : 'Next'}
          onPress={handleNext}
          variant="primary"
          size="md"
          disabled={!isAnswered}
          testID="next-button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  progressText: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    gap: Spacing.md,
  },
});