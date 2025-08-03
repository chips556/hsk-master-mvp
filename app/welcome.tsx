import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing } from '@/constants/colors';
import { BookOpen, Target, Award, TrendingUp } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: Target,
      title: 'Adaptive Testing',
      description: 'AI-powered questions that adapt to your skill level',
    },
    {
      icon: BookOpen,
      title: 'Complete HSK Coverage',
      description: 'Practice materials for HSK levels 3, 4, 5, and 6',
    },
    {
      icon: Award,
      title: 'Detailed Analytics',
      description: 'Track your progress and identify areas for improvement',
    },
    {
      icon: TrendingUp,
      title: 'Personalized Insights',
      description: 'AI-generated study recommendations based on your performance',
    },
  ];

  return (
    <ScrollView style={styles.container} testID="welcome-container">
      {/* Hero Section */}
      <View style={styles.heroSection} testID="hero-section">
        <View style={styles.logoContainer} testID="logo-container">
          <Text style={styles.logoText}>HSK Master</Text>
        </View>
        <Text style={styles.heroTitle}>Master the HSK Exam with Confidence</Text>
        <Text style={styles.heroSubtitle}>
          Practice with adaptive tests, get AI-powered insights, and track your progress 
          towards HSK certification success.
        </Text>
        
        <View style={styles.heroButtons} testID="hero-buttons">
          <Button
            title="Get Started Free"
            onPress={() => router.push('/signup')}
            variant="primary"
            size="lg"
            fullWidth
            testID="get-started-button"
          />
          <Button
            title="Take Placement Test"
            onPress={() => router.push('/placement-quiz')}
            variant="outline"
            size="md"
            fullWidth
            testID="placement-test-button"
          />
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection} testID="features-section">
        <Text style={styles.sectionTitle}>Why Choose HSK Master?</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                elevated 
                shadow="sm" 
                style={styles.featureCard}
                testID={`feature-card-${index}`}
              >
                <View style={styles.featureIcon} testID={`feature-icon-${index}`}>
                  <IconComponent size={24} color={Colors.primary[600]} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Card>
            );
          })}
        </View>
      </View>

      {/* Social Proof */}
      <View style={styles.socialProofSection} testID="social-proof">
        <Card elevated shadow="md" style={styles.socialProofCard}>
          <Text style={styles.socialProofTitle}>Join 10,000+ Students</Text>
          <Text style={styles.socialProofSubtitle}>
            Already improving their HSK scores with our platform
          </Text>
          <View style={styles.statsRow} testID="stats-row">
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>94%</Text>
              <Text style={styles.statLabel}>Pass Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8★</Text>
              <Text style={styles.statLabel}>User Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50k+</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection} testID="cta-section">
        <Text style={styles.ctaTitle}>Ready to Start Your HSK Journey?</Text>
        <Text style={styles.ctaSubtitle}>
          Begin with our free placement test to discover your current level
        </Text>
        <Button
          title="Start Learning Today"
          onPress={() => router.push('/signup')}
          variant="primary"
          size="lg"
          fullWidth
          testID="start-learning-button"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heroSection: {
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
  },
  logoContainer: {
    marginBottom: Spacing.xl,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary[600],
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  heroButtons: {
    width: '100%',
    gap: Spacing.md,
  },
  featuresSection: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[800],
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  featuresGrid: {
    gap: Spacing.lg,
  },
  featureCard: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 20,
  },
  socialProofSection: {
    padding: Spacing.lg,
  },
  socialProofCard: {
    alignItems: 'center',
    backgroundColor: Colors.primary[600],
  },
  socialProofTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  socialProofSubtitle: {
    fontSize: 14,
    color: Colors.primary[100],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.primary[200],
  },
  ctaSection: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.neutral[800],
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
});