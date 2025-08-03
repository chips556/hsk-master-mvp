import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing } from '@/constants/colors';
import { mockTests } from '@/data/mockData';
import { Clock, BookOpen, Target } from 'lucide-react-native';

export default function TestsScreen() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<3 | 4 | 5 | 6 | 'all'>('all');

  const filteredTests = selectedLevel === 'all' 
    ? mockTests 
    : mockTests.filter(test => test.level === selectedLevel);

  const levelTabs = [
    { value: 'all' as const, label: 'All Levels' },
    { value: 3 as const, label: 'HSK 3' },
    { value: 4 as const, label: 'HSK 4' },
    { value: 5 as const, label: 'HSK 5' },
    { value: 6 as const, label: 'HSK 6' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return Colors.success[500];
      case 'medium':
        return Colors.warning[500];
      case 'hard':
        return Colors.error[500];
      default:
        return Colors.neutral[500];
    }
  };

  return (
    <View style={styles.container} testID="tests-container">
      <View style={styles.header} testID="tests-header">
        <Text style={styles.title}>Practice Tests</Text>
        <Text style={styles.subtitle}>Choose a test to begin your practice</Text>
      </View>

      {/* Level Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
        testID="level-tabs"
      >
        {levelTabs.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              selectedLevel === tab.value && styles.activeTab,
            ]}
            onPress={() => setSelectedLevel(tab.value)}
            testID={`level-tab-${tab.value}`}
          >
            <Text
              style={[
                styles.tabText,
                selectedLevel === tab.value && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Test List */}
      <ScrollView style={styles.testList} testID="test-list">
        {filteredTests.map((test, index) => (
          <Card key={test.id} elevated shadow="md" style={styles.testCard}>
            <View style={styles.testHeader} testID={`test-header-${index}`}>
              <View style={styles.testTitleRow}>
                <Text style={styles.testTitle}>{test.title}</Text>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(test.difficulty) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(test.difficulty) },
                    ]}
                  >
                    {test.difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>
              
              <View style={styles.testMeta} testID={`test-meta-${index}`}>
                <View style={styles.metaItem}>
                  <BookOpen size={16} color={Colors.neutral[500]} />
                  <Text style={styles.metaText}>{test.totalQuestions} questions</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={16} color={Colors.neutral[500]} />
                  <Text style={styles.metaText}>{test.timeLimit} min</Text>
                </View>
                <View style={styles.metaItem}>
                  <Target size={16} color={Colors.neutral[500]} />
                  <Text style={styles.metaText}>HSK {test.level}</Text>
                </View>
              </View>

              <View style={styles.sectionsContainer} testID={`sections-${index}`}>
                <Text style={styles.sectionsLabel}>Sections:</Text>
                <View style={styles.sectionTags}>
                  {test.sections.map((section) => (
                    <View key={section} style={styles.sectionTag}>
                      <Text style={styles.sectionTagText}>{section}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <Button
              title="Start Test"
              onPress={() => router.push(`/test-config?testId=${test.id}`)}
              variant="primary"
              size="md"
              fullWidth
              testID={`start-test-${index}`}
            />
          </Card>
        ))}
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
  tabsContainer: {
    marginBottom: Spacing.lg,
  },
  tabsContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  tab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  activeTab: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.white,
  },
  testList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  testCard: {
    marginBottom: Spacing.lg,
  },
  testHeader: {
    marginBottom: Spacing.lg,
  },
  testTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: Spacing.sm,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  testMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: 14,
    color: Colors.neutral[600],
  },
  sectionsContainer: {
    marginBottom: Spacing.md,
  },
  sectionsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[700],
    marginBottom: Spacing.sm,
  },
  sectionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  sectionTag: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sectionTagText: {
    fontSize: 12,
    color: Colors.primary[600],
    fontWeight: '500',
  },
});