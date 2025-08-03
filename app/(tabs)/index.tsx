import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors, Spacing } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { Target, Zap, Trophy, Clock } from 'lucide-react-native';

export default function Dashboard() {
  const router = useRouter();
  const { state } = useAppContext();
  const { user } = state;

  if (!user) {
    return (
      <View style={styles.container} testID="dashboard-loading">
        <Text>Loading...</Text>
      </View>
    );
  }

  const recentTestResults = state.testResults.slice(-3);
  const weeklyProgress = Math.round(Math.random() * 40 + 60); // Mock weekly progress

  return (
    <ScrollView style={styles.container} testID="dashboard-container">
      <View style={styles.header} testID="dashboard-header">
        <Text style={styles.welcomeText}>Welcome back, {user.name || 'Student'}!</Text>
        <Text style={styles.levelText}>Current Level: HSK {user.provisionalLevel}</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer} testID="stats-container">
        <Card elevated shadow="sm" style={styles.statCard}>
          <View style={styles.statContent}>
            <Trophy size={24} color={Colors.warning[500]} />
            <Text style={styles.statNumber}>{user.studyStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </Card>
        <Card elevated shadow="sm" style={styles.statCard}>
          <View style={styles.statContent}>
            <Target size={24} color={Colors.primary[600]} />
            <Text style={styles.statNumber}>{user.totalTestsTaken}</Text>
            <Text style={styles.statLabel}>Tests Taken</Text>
          </View>
        </Card>
        <Card elevated shadow="sm" style={styles.statCard}>
          <View style={styles.statContent}>
            <Zap size={24} color={Colors.success[500]} />
            <Text style={styles.statNumber}>{user.averageScore}%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
        </Card>
      </View>

      {/* Weekly Progress */}
      <Card elevated shadow="md" style={styles.progressCard} testID="weekly-progress">
        <Text style={styles.cardTitle}>Weekly Progress</Text>
        <View style={styles.progressContent}>
          <Text style={styles.progressPercentage}>{weeklyProgress}%</Text>
          <ProgressBar percentage={weeklyProgress} height={12} />
          <Text style={styles.progressSubtext}>
            You're doing great! Keep up the momentum.
          </Text>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card elevated shadow="md" style={styles.actionsCard} testID="quick-actions">
        <Text style={styles.cardTitle}>Quick Start</Text>
        <View style={styles.actionButtons}>
          <Button
            title="Take Practice Test"
            onPress={() => router.push('/tests')}
            variant="primary"
            size="lg"
            fullWidth
            testID="start-practice-test"
          />
          <Button
            title="Review Mistakes"
            onPress={() => router.push('/history')}
            variant="outline"
            size="md"
            fullWidth
            testID="review-mistakes"
          />
        </View>
      </Card>

      {/* Recent Results */}
      {recentTestResults.length > 0 && (
        <Card elevated shadow="md" style={styles.resultsCard} testID="recent-results">
          <Text style={styles.cardTitle}>Recent Results</Text>
          {recentTestResults.map((result, index) => (
            <TouchableOpacity 
              key={result.id} 
              style={styles.resultItem}
              onPress={() => router.push(`/history/${result.id}`)}
              testID={`result-item-${index}`}
            >
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>HSK {4} Practice Test</Text>
                <View style={styles.resultMeta}>
                  <Clock size={14} color={Colors.neutral[500]} />
                  <Text style={styles.resultTime}>{result.timeSpent} min</Text>
                </View>
              </View>
              <ScoreDisplay
                score={result.score.total}
                total={30}
                percentage={result.score.percentage}
                passed={result.score.passed}
                size="sm"
              />
            </TouchableOpacity>
          ))}
        </Card>
      )}
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
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  levelText: {
    fontSize: 16,
    color: Colors.primary[600],
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statContent: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    color: Colors.neutral[500],
    fontWeight: '500',
  },
  progressCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.md,
  },
  progressContent: {
    gap: Spacing.md,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary[600],
    textAlign: 'center',
  },
  progressSubtext: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  actionsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  actionButtons: {
    gap: Spacing.md,
  },
  resultsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  resultTime: {
    fontSize: 12,
    color: Colors.neutral[500],
  },
});