import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing } from '@/constants/colors';
import { subscriptionPlans } from '@/data/mockData';
import { Check, Crown, Zap } from 'lucide-react-native';

export default function PricingScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    router.push(`/checkout?plan=${selectedPlan}`);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'lifetime':
        return <Crown size={24} color={Colors.warning[500]} />;
      case 'annual':
        return <Zap size={24} color={Colors.primary[600]} />;
      default:
        return <Check size={24} color={Colors.success[500]} />;
    }
  };

  const getPlanSavings = (planId: string) => {
    if (planId === 'annual') return 'Save 50%';
    if (planId === 'lifetime') return 'Best Value';
    return null;
  };

  return (
    <View style={styles.container} testID="pricing-container">
      <View style={styles.header} testID="pricing-header">
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Unlock full access to HSK Master and accelerate your learning
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.plansContainer} testID="plans-container">
          {subscriptionPlans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const savings = getPlanSavings(plan.id);
            
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => handleSelectPlan(plan.id)}
                testID={`plan-${plan.id}`}
              >
                <Card
                  elevated
                  shadow={isSelected ? 'lg' : 'md'}
                  style={[
                    styles.planCard,
                    isSelected && styles.selectedPlan,
                    plan.popular && styles.popularPlan,
                  ]}
                >
                  {plan.popular && (
                    <View style={styles.popularBadge} testID="popular-badge">
                      <Text style={styles.popularText}>MOST POPULAR</Text>
                    </View>
                  )}

                  <View style={styles.planHeader} testID={`plan-header-${index}`}>
                    <View style={styles.planTitleRow}>
                      {getPlanIcon(plan.id)}
                      <Text style={styles.planName}>{plan.name}</Text>
                      {savings && (
                        <View style={styles.savingsBadge}>
                          <Text style={styles.savingsText}>{savings}</Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>${plan.price}</Text>
                      <Text style={styles.period}>
                        {plan.period === 'lifetime' ? 'one-time' : `/${plan.period.slice(0, -2)}`}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.featuresContainer} testID={`features-${index}`}>
                    {plan.features.map((feature, featureIndex) => (
                      <View key={featureIndex} style={styles.featureItem} testID={`feature-${index}-${featureIndex}`}>
                        <Check size={16} color={Colors.success[500]} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  {isSelected && (
                    <View style={styles.selectedIndicator} testID="selected-indicator">
                      <Text style={styles.selectedText}>Selected</Text>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Value Proposition */}
        <Card elevated shadow="md" style={styles.valueCard} testID="value-proposition">
          <Text style={styles.valueTitle}>Why HSK Master?</Text>
          <View style={styles.valuePoints}>
            <View style={styles.valuePoint} testID="value-point-0">
              <Text style={styles.valueIcon}>🎯</Text>
              <Text style={styles.valueText}>Adaptive testing that adjusts to your level</Text>
            </View>
            <View style={styles.valuePoint} testID="value-point-1">
              <Text style={styles.valueIcon}>🧠</Text>
              <Text style={styles.valueText}>AI-powered insights and study recommendations</Text>
            </View>
            <View style={styles.valuePoint} testID="value-point-2">
              <Text style={styles.valueIcon}>📊</Text>
              <Text style={styles.valueText}>Comprehensive progress tracking</Text>
            </View>
            <View style={styles.valuePoint} testID="value-point-3">
              <Text style={styles.valueIcon}>✅</Text>
              <Text style={styles.valueText}>94% student pass rate</Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer} testID="pricing-footer">
        <Button
          title="Continue with Selected Plan"
          onPress={handleContinue}
          variant="primary"
          size="lg"
          fullWidth
          testID="continue-with-plan"
        />
        <Text style={styles.footerText}>Cancel anytime • 30-day money-back guarantee</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  plansContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  planCard: {
    position: 'relative',
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: Colors.primary[600],
  },
  popularPlan: {
    borderWidth: 2,
    borderColor: Colors.warning[500],
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: Spacing.lg,
    backgroundColor: Colors.warning[500],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
  },
  planHeader: {
    marginBottom: Spacing.lg,
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral[800],
    flex: 1,
  },
  savingsBadge: {
    backgroundColor: Colors.success[100],
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  savingsText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.success[600],
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  period: {
    fontSize: 16,
    color: Colors.neutral[500],
  },
  featuresContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
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
  selectedIndicator: {
    backgroundColor: Colors.primary[600],
    padding: Spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  valueCard: {
    marginBottom: Spacing.lg,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  valuePoints: {
    gap: Spacing.md,
  },
  valuePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  valueIcon: {
    fontSize: 20,
  },
  valueText: {
    fontSize: 14,
    color: Colors.neutral[700],
    flex: 1,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    gap: Spacing.md,
  },
  footerText: {
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});