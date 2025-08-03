import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { CircleCheck as CheckCircle, Gift, BookOpen, Target } from 'lucide-react-native';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { state } = useAppContext();
  const { user } = state;

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  const nextSteps = [
    {
      icon: BookOpen,
      title: 'Explore Practice Tests',
      description: 'Start with tests at your HSK level',
    },
    {
      icon: Target,
      title: 'Set Your Goals',
      description: 'Define your target exam date and score',
    },
    {
      icon: Gift,
      title: 'Get Personalized Insights',
      description: 'Receive AI-powered study recommendations',
    },
  ];

  return (
    <ScrollView style={styles.container} testID="payment-success-container">
      <View style={styles.header} testID="success-header">
        <View style={styles.successIcon} testID="success-icon">
          <CheckCircle size={64} color={Colors.success[500]} />
        </View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSubtitle}>
          Welcome to HSK Master {user?.subscription.plan} plan
        </Text>
      </View>

      {/* Subscription Details */}
      <Card elevated shadow="lg" style={styles.subscriptionCard} testID="subscription-details">
        <Text style={styles.cardTitle}>Subscription Activated</Text>
        <View style={styles.subscriptionInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Plan:</Text>
            <Text style={styles.infoValue}>
              {user?.subscription.plan?.charAt(0).toUpperCase() + user?.subscription.plan?.slice(1)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, { color: Colors.success[500] }]}>
              Active
            </Text>
          </View>
          {user?.subscription.plan !== 'lifetime' && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Next Billing:</Text>
              <Text style={styles.infoValue}>
                {user?.subscription.expiresAt.toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </Card>

      {/* What's Included */}
      <Card elevated shadow="md" style={styles.featuresCard} testID="whats-included">
        <Text style={styles.cardTitle}>What's Included</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem} testID="feature-item-0">
            <CheckCircle size={16} color={Colors.success[500]} />
            <Text style={styles.featureText}>Unlimited practice tests</Text>
          </View>
          <View style={styles.featureItem} testID="feature-item-1">
            <CheckCircle size={16} color={Colors.success[500]} />
            <Text style={styles.featureText}>AI-powered performance insights</Text>
          </View>
          <View style={styles.featureItem} testID="feature-item-2">
            <CheckCircle size={16} color={Colors.success[500]} />
            <Text style={styles.featureText}>Detailed progress tracking</Text>
          </View>
          <View style={styles.featureItem} testID="feature-item-3">
            <CheckCircle size={16} color={Colors.success[500]} />
            <Text style={styles.featureText}>All HSK levels (3-6)</Text>
          </View>
          <View style={styles.featureItem} testID="feature-item-4">
            <CheckCircle size={16} color={Colors.success[500]} />
            <Text style={styles.featureText}>Premium support</Text>
          </View>
        </View>
      </Card>

      {/* Next Steps */}
      <Card elevated shadow="md" style={styles.nextStepsCard} testID="next-steps">
        <Text style={styles.cardTitle}>Ready to Start Learning?</Text>
        <Text style={styles.cardSubtitle}>Here's what you can do next:</Text>
        
        <View style={styles.stepsList}>
          {nextSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <View key={index} style={styles.stepItem} testID={`step-item-${index}`}>
                <View style={styles.stepIcon}>
                  <IconComponent size={20} color={Colors.primary[600]} />
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Card>

      {/* CTA */}
      <View style={styles.actions} testID="success-actions">
        <Button
          title="Start Learning Now"
          onPress={handleGetStarted}
          variant="primary"
          size="lg"
          fullWidth
          testID="start-learning"
        />
      </View>

      {/* Footer */}
      <View style={styles.footer} testID="success-footer">
        <Text style={styles.footerText}>
          Need help? Contact our support team anytime
        </Text>
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
  successIcon: {
    marginBottom: Spacing.lg,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  subscriptionCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.success[50],
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.lg,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: Spacing.lg,
  },
  subscriptionInfo: {
    gap: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.neutral[600],
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
  },
  featuresCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  featuresList: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    fontSize: 14,
    color: Colors.neutral[700],
    flex: 1,
  },
  nextStepsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  stepsList: {
    gap: Spacing.lg,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.neutral[600],
    lineHeight: 20,
  },
  actions: {
    padding: Spacing.lg,
  },
  footer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});