import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { Colors, Spacing } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { Calendar, Clock, TrendingUp } from 'lucide-react-native';

export default function HistoryScreen() {
  const router = useRouter();
  const { state } = useAppContext();
  
  // Mock data for demonstration
  const testHistory = [
    {
      id: '1',
      testName: 'HSK 4 Practice Test 1',
      date: new Date('2024-01-15'),
      score: 85,
      total: 100,
      timeSpent: 45,
      passed: true,
    },
    {
      id: '2',
      testName: 'HSK 4 Practice Test 2',
      date: new Date('2024-01-12'),
      score: 78,
      total: 100,
      timeSpent: 52,
      passed: true,
    },
    {
      id: '3',
      testName: 'HSK 3 Review Test',
      date: new Date('2024-01-10'),
      score: 92,
      total: 100,
      timeSpent: 38,
      passed: true,
    },
  ];

  const averageScore = Math.round(testHistory.reduce((sum, test) => sum + test.score, 0) / testHistory.length);
  const totalTimeStudied = testHistory.reduce((sum, test) => sum + test.timeSpent, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container} testID="history-container">
      <View style={styles.header} testID="history-header">
        <Text style={styles.title}>Progress & History</Text>
        <Text style={styles.subtitle}>Track your learning journey</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Overall Stats */}
        <Card elevated shadow="md" style={styles.statsCard} testID="overall-stats">
          <Text style={styles.cardTitle}>Overall Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <TrendingUp size={24} color={Colors.success[500]} />
              <Text style={styles.statValue}>{averageScore}%</Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
            <View style={styles.statItem}>
              <Calendar size={24} color={Colors.primary[600]} />
              <Text style={styles.statValue}>{testHistory.length}</Text>
              <Text style={styles.statLabel}>Tests Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={24} color={Colors.warning[500]} />
              <Text style={styles.statValue}>{Math.round(totalTimeStudied / 60)}h</Text>
              <Text style={styles.statLabel}>Study Time</Text>
            </View>
          </View>
        </Card>

        {/* Test History */}
        <Card elevated shadow="md" style={styles.historyCard} testID="test-history">
          <Text style={styles.cardTitle}>Recent Tests</Text>
          <View style={styles.historyList}>
            {testHistory.map((test, index) => (
              <TouchableOpacity
                key={test.id}
                style={styles.historyItem}
                onPress={() => router.push(`/test-result?id=${test.id}`)}
                testID={`history-item-${index}`}
              >
                <View style={styles.historyInfo}>
                  <Text style={styles.historyTitle}>{test.testName}</Text>
                  <View style={styles.historyMeta}>
                    <Text style={styles.historyDate}>{formatDate(test.date)}</Text>
                    <View style={styles.historyTime}>
                      <Clock size={12} color={Colors.neutral[400]} />
                      <Text style={styles.historyTimeText}>{test.timeSpent} min</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.historyScore}>
                  <ScoreDisplay
                    score={test.score}
                    total={test.total}
                    passed={test.passed}
                    size="sm"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Progress Chart Placeholder */}
        <Card elevated shadow="md" style={styles.chartCard} testID="progress-chart">
          <Text style={styles.cardTitle}>Progress Over Time</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>📈 Chart visualization coming soon</Text>
            <Text style={styles.chartSubtext}>
              Track your improvement across different HSK levels
            </Text>
          </View>
        </Card>
      </ScrollView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  statsCard: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    color: Colors.neutral[500],
    fontWeight: '500',
  },
  historyCard: {
    marginBottom: Spacing.lg,
  },
  historyList: {
    gap: Spacing.md,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  historyInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  historyDate: {
    fontSize: 14,
    color: Colors.neutral[500],
  },
  historyTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  historyTimeText: {
    fontSize: 12,
    color: Colors.neutral[400],
  },
  historyScore: {
    alignItems: 'flex-end',
  },
  chartCard: {
    marginBottom: Spacing.lg,
  },
  chartPlaceholder: {
    padding: Spacing.xl,
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    borderRadius: 8,
  },
  chartText: {
    fontSize: 18,
    color: Colors.neutral[600],
    marginBottom: Spacing.sm,
  },
  chartSubtext: {
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});