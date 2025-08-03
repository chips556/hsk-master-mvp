import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/colors';
import { ProgressBar } from './ProgressBar';

interface ScoreDisplayProps {
  score: number;
  total: number;
  percentage?: number;
  passed?: boolean;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  testID?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  total,
  percentage,
  passed,
  showPercentage = true,
  size = 'md',
  testID,
}) => {
  const calculatedPercentage = percentage || Math.round((score / total) * 100);
  const passColor = passed ? Colors.success[500] : Colors.error[500];

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return { main: 16, sub: 12 };
      case 'lg':
        return { main: 32, sub: 18 };
      default:
        return { main: 24, sub: 14 };
    }
  };

  const fontSize = getFontSize();

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.scoreRow}>
        <Text style={[styles.scoreText, { fontSize: fontSize.main }]}>
          {score}/{total}
        </Text>
        {showPercentage && (
          <Text style={[styles.percentageText, { fontSize: fontSize.sub, color: passColor }]}>
            {calculatedPercentage}%
          </Text>
        )}
      </View>
      
      <ProgressBar
        percentage={calculatedPercentage}
        color={passColor}
        height={size === 'lg' ? 12 : 8}
      />
      
      {passed !== undefined && (
        <Text style={[styles.statusText, { color: passColor, fontSize: fontSize.sub }]}>
          {passed ? '✓ Passed' : '✗ Failed'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreText: {
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  percentageText: {
    fontWeight: '600',
  },
  statusText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});