import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, BorderRadius } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { subscriptionPlans } from '@/data/mockData';
import { CreditCard, Lock, Shield } from 'lucide-react-native';

export default function CheckoutScreen() {
  const router = useRouter();
  const { plan: planId } = useLocalSearchParams<{ plan: string }>();
  const { state, dispatch } = useAppContext();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const selectedPlan = subscriptionPlans.find(p => p.id === planId);

  if (!selectedPlan) {
    return (
      <View style={styles.container} testID="checkout-error">
        <Text>Plan not found</Text>
      </View>
    );
  }

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Alert.alert('Error', 'Please fill in all payment details');
      return;
    }

    setIsProcessing(true);

    // Mock payment processing
    setTimeout(() => {
      if (state.user) {
        const updatedUser = {
          ...state.user,
          subscription: {
            plan: selectedPlan.id as any,
            status: 'active' as const,
            expiresAt: selectedPlan.period === 'lifetime' 
              ? new Date('2099-12-31') 
              : new Date(Date.now() + (selectedPlan.period === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000),
          },
        };
        
        dispatch({ type: 'SET_USER', payload: updatedUser });
      }
      
      setIsProcessing(false);
      router.push('/payment-success');
    }, 2000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const getTotalAmount = () => {
    return selectedPlan.price;
  };

  return (
    <ScrollView style={styles.container} testID="checkout-container">
      <View style={styles.header} testID="checkout-header">
        <Text style={styles.title}>Secure Checkout</Text>
        <View style={styles.securityBadge} testID="security-badge">
          <Shield size={16} color={Colors.success[500]} />
          <Text style={styles.securityText}>256-bit SSL Encrypted</Text>
        </View>
      </View>

      {/* Order Summary */}
      <Card elevated shadow="md" style={styles.summaryCard} testID="order-summary">
        <Text style={styles.cardTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{selectedPlan.name} Plan</Text>
          <Text style={styles.summaryValue}>${selectedPlan.price}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${getTotalAmount()}</Text>
        </View>
        <Text style={styles.billingNote}>
          {selectedPlan.period === 'lifetime' 
            ? 'One-time payment' 
            : `Billed ${selectedPlan.period}`}
        </Text>
      </Card>

      {/* Payment Form */}
      <Card elevated shadow="md" style={styles.paymentCard} testID="payment-form">
        <View style={styles.paymentHeader}>
          <CreditCard size={24} color={Colors.primary[600]} />
          <Text style={styles.cardTitle}>Payment Information</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer} testID="cardholder-input">
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholder="John Doe"
              placeholderTextColor={Colors.neutral[400]}
              autoCapitalize="words"
              testID="cardholder-name-input"
            />
          </View>

          <View style={styles.inputContainer} testID="card-number-input">
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={Colors.neutral[400]}
              keyboardType="numeric"
              maxLength={19}
              testID="card-number-input"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1 }]} testID="expiry-input">
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                placeholder="MM/YY"
                placeholderTextColor={Colors.neutral[400]}
                keyboardType="numeric"
                maxLength={5}
                testID="expiry-date-input"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]} testID="cvv-input">
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={setCvv}
                placeholder="123"
                placeholderTextColor={Colors.neutral[400]}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                testID="cvv-input"
              />
            </View>
          </View>
        </View>
      </Card>

      {/* Security Notice */}
      <Card style={styles.securityCard} testID="security-notice">
        <View style={styles.securityContent}>
          <Lock size={20} color={Colors.success[500]} />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Your payment is secure</Text>
            <Text style={styles.securityDescription}>
              We use industry-standard encryption to protect your payment information
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.actions} testID="checkout-actions">
        <Button
          title={`Pay $${getTotalAmount()}`}
          onPress={handlePayment}
          variant="primary"
          size="lg"
          fullWidth
          loading={isProcessing}
          testID="pay-button"
        />
        <Button
          title="Back to Plans"
          onPress={() => router.back()}
          variant="outline"
          size="md"
          fullWidth
          testID="back-button"
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: Spacing.md,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.success[50],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  securityText: {
    fontSize: 12,
    color: Colors.success[600],
    fontWeight: '500',
  },
  summaryCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.neutral[700],
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: Spacing.md,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  billingNote: {
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  paymentCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  form: {
    gap: Spacing.lg,
  },
  inputContainer: {
    gap: Spacing.sm,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[700],
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 16,
    color: Colors.neutral[800],
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  securityCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.success[50],
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.success[700],
  },
  securityDescription: {
    fontSize: 12,
    color: Colors.success[600],
    lineHeight: 16,
  },
  actions: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
});