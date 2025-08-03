import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Colors, Spacing } from '@/constants/colors';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string | number;
  onAnswer: (answer: string | number) => void;
  showCorrectAnswer?: boolean;
  questionNumber?: number;
  totalQuestions?: number;
  testID?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswer,
  showCorrectAnswer = false,
  questionNumber,
  totalQuestions,
  testID,
}) => {
  const getOptionStyle = (index: number, isSelected: boolean) => {
    let backgroundColor = Colors.white;
    let borderColor = Colors.neutral[300];
    let textColor = Colors.neutral[700];

    if (isSelected) {
      backgroundColor = Colors.primary[50];
      borderColor = Colors.primary[600];
      textColor = Colors.primary[700];
    }

    if (showCorrectAnswer) {
      if (index === question.correctAnswer) {
        backgroundColor = Colors.success[50];
        borderColor = Colors.success[500];
        textColor = Colors.success[700];
      } else if (isSelected && index !== question.correctAnswer) {
        backgroundColor = Colors.error[50];
        borderColor = Colors.error[500];
        textColor = Colors.error[700];
      }
    }

    return {
      backgroundColor,
      borderColor,
      textColor,
    };
  };

  return (
    <Card elevated shadow="md" style={styles.container} testID={testID}>
      {questionNumber && totalQuestions && (
        <Text style={styles.questionNumber}>
          Question {questionNumber} of {totalQuestions}
        </Text>
      )}
      
      <Text style={styles.sectionTag}>{question.section}</Text>
      
      {question.questionChinese && (
        <Text style={styles.chineseText}>{question.questionChinese}</Text>
      )}
      
      <Text style={styles.questionText}>{question.question}</Text>

      {question.type === 'multiple_choice' && question.options && (
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const optionStyle = getOptionStyle(index, isSelected);
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  {
                    backgroundColor: optionStyle.backgroundColor,
                    borderColor: optionStyle.borderColor,
                  },
                ]}
                onPress={() => onAnswer(index)}
                disabled={showCorrectAnswer}
                testID={`option-${index}`}
              >
                <Text style={[styles.optionText, { color: optionStyle.textColor }]}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {showCorrectAnswer && question.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: Spacing.md,
  },
  questionNumber: {
    fontSize: 12,
    color: Colors.neutral[500],
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  sectionTag: {
    fontSize: 12,
    color: Colors.primary[600],
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
    fontWeight: '500',
  },
  chineseText: {
    fontSize: 24,
    color: Colors.neutral[800],
    fontWeight: '400',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 16,
    color: Colors.neutral[700],
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  option: {
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  explanationContainer: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.neutral[50],
    borderRadius: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral[700],
    marginBottom: Spacing.sm,
  },
  explanationText: {
    fontSize: 14,
    color: Colors.neutral[600],
    lineHeight: 20,
  },
});