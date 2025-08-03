import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { Award, Target, BookOpen, TrendingUp } from 'lucide-react-native';

export default function PlacementResultsScreen() {
  const router = useRouter();
  const { state } = useAppContext();
  const { placementResult } = state;

  if (!placementResult) {
    return (
      <View style={styles.container} testID="results-loading">
        <Text>Loading results...</Text>
      </View>
    );
  }

  const handleContinue = () => {
    router.push('/pricing');
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 3:
        return Colors.success[500];
      case 4:
        return Colors.warning[500];
      case 5:
        return Colors.error[500];
      case 6:
        return Colors.primary[600];
      default:
        return Colors.neutral[500];
    }
  };

  return (
    <ScrollView style={styles.container} testID="placement-results-container">
      <View style={styles.header} testID="results-header">
        <View style={styles.congratulations}>
          <Award size={48} color={Colors.warning[500]} />
          <Text style={styles.congratsTitle}>Congratulations!</Text>
          <Text style={styles.congratsSubtitle}>You've completed the placement quiz</Text>
        </View>
      </View>

      {/* Level Result */}
      <Card elevated shadow="lg" style={styles.levelCard} testID="level-result-card">
        <View style={styles.levelResult}>
          <Text style={styles.levelLabel}>Your Estimated Level</Text>
          <View style={styles.levelDisplay}>
            <Text style={[styles.levelNumber, { color: getLevelColor(placementResult.estimatedLevel) }]}>
              HSK {placementResult.estimatedLevel}
            </Text>
            <Text style={styles.confidenceText}>
              {placementResult.confidence}% confidence
            </Text>
          </View>
        </View>
      </Card>

      {/* Performance Breakdown */}
      <Card elevated shadow="md" style={styles.performanceCard} testID="performance-breakdown">
        <Text style={styles.cardTitle}>Performance Breakdown</Text>
        
        {placementResult.strongAreas.length > 0 && (
          <View style={styles.areaSection} testID="strong-areas">
            <View style={styles.areaHeader}>
              <TrendingUp size={20} color={Colors.success[500]} />
              <Text style={styles.areaTitle}>Strong Areas</Text>
            </View>
            <View style={styles.areaList}>
              {placementResult.strongAreas.map((area, index) => (
                <View key={index} style={styles.areaItem} testID={`strong-area-${index}`}>
                  <Text style={styles.areaText}>{area}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {placementResult.weakAreas.length > 0 && (
          <View style={styles.areaSection} testID="weak-areas">
            <View style={styles.areaHeader}>
              <Target size={20} color={Colors.warning[500]} />
              <Text style={styles.areaTitle}>Areas for Improvement</Text>
            </View>
            <View style={styles.areaList}>
              {placementResult.weakAreas.map((area, index) => (
                <View key={index} style={styles.areaItem} testID={`weak-area-${index}`}>
                  <Text style={styles.areaText}>{area}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Card>

      {/* Recommendation */}
      <Card elevated shadow="md" style={styles.recommendationCard} testID="recommendation-card">
        <View style={styles.recommendationHeader}>
          <BookOpen size={24} color={Colors.primary[600]} />
          <Text style={styles.cardTitle}>Our Recommendation</Text>
        </View>
        <Text style={styles.recommendationText}>
          {placementResult.recommendation}
        </Text>
      </Card>

      {/* Next Steps */}
      <Card elevated shadow="md" style={styles.nextStepsCard} testID="next-steps-card">
        <Text style={styles.cardTitle}>Next Steps</Text>
        <View style={styles.stepsList}>
          <View style={styles.stepItem} testID="step-item-0">
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Choose a subscription plan to unlock full access</Text>
          </View>
          <View style={styles.stepItem} testID="step-item-1">
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Start with practice tests at your level</Text>
          </View>
          <View style={styles.stepItem} testID="step-item-2">
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Track your progress and improve weak areas</Text>
          </View>
        </View>
      </Card>

      <View style={styles.actions} testID="results-actions">
        <Button
          title="Continue to Subscription"
          onPress={handleContinue}
          variant="primary"
          size="lg"
          fullWidth
          testID="continue-button"
        />
        <Button
          title="Retake Placement Quiz"
          onPress={() => router.push('/placement-quiz')}
          variant="outline"
          size="md"
          fullWidth
          testID="retake-button"
        />
      </View>
    </ScrollView>
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
    alignItems: 'center',
  },
  congratulations: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  congratsSubtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  levelCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
  },
  levelResult: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  levelLabel: {
    fontSize: 16,
    color: Colors.neutral[600],
    fontWeight: '500',
  },
  levelDisplay: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  levelNumber: {
    fontSize: 48,
    fontWeight: '800',
  },
  confidenceText: {
    fontSize: 14,
    color: Colors.neutral[600],
  },
  performanceCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.lg,
  },
  areaSection: {
    marginBottom: Spacing.lg,
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  areaTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[700],
  },
  areaList: {
    gap: Spacing.sm,
  },
  areaItem: {
    backgroundColor: Colors.neutral[50],
    padding: Spacing.md,
    borderRadius: 8,
  },
  areaText: {
    fontSize: 14,
    color: Colors.neutral[700],
  },
  recommendationCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  recommendationText: {
    fontSize: 16,
    color: Colors.neutral[700],
    lineHeight: 24,
  },
  nextStepsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  stepsList: {
    gap: Spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary[600],
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral[700],
    lineHeight: 20,
  },
  actions: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
});