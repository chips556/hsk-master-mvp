import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, BorderRadius } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { mockUser } from '@/data/mockData';

export default function SignupScreen() {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Mock signup process
    setTimeout(() => {
      const newUser = {
        ...mockUser,
        email,
        name,
        id: Date.now().toString(),
      };
      
      dispatch({ type: 'SET_USER', payload: newUser });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      setIsLoading(false);
      
      // Navigate to placement quiz
      router.replace('/placement-quiz');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} testID="signup-container">
      <View style={styles.header} testID="signup-header">
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Join thousands of students mastering HSK</Text>
      </View>

      <Card elevated shadow="lg" style={styles.formCard} testID="signup-form">
        <View style={styles.form}>
          <View style={styles.inputContainer} testID="name-input-container">
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={Colors.neutral[400]}
              autoCapitalize="words"
              testID="name-input"
            />
          </View>

          <View style={styles.inputContainer} testID="email-input-container">
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor={Colors.neutral[400]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              testID="email-input"
            />
          </View>

          <Button
            title="Create Account"
            onPress={handleSignup}
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!email || !name}
            testID="create-account-button"
          />

          <Text style={styles.termsText} testID="terms-text">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </Card>

      {/* Benefits Section */}
      <Card elevated shadow="md" style={styles.benefitsCard} testID="benefits-card">
        <Text style={styles.benefitsTitle}>What You'll Get</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem} testID="benefit-item-0">
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Free placement test to find your level</Text>
          </View>
          <View style={styles.benefitItem} testID="benefit-item-1">
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Access to practice questions</Text>
          </View>
          <View style={styles.benefitItem} testID="benefit-item-2">
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Progress tracking and analytics</Text>
          </View>
          <View style={styles.benefitItem} testID="benefit-item-3">
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Personalized study recommendations</Text>
          </View>
        </View>
      </Card>

      <View style={styles.loginPrompt} testID="login-prompt">
        <Text style={styles.loginText}>Already have an account? </Text>
        <Button
          title="Sign In"
          onPress={() => router.push('/login')}
          variant="ghost"
          size="sm"
          testID="sign-in-button"
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
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  formCard: {
    marginHorizontal: Spacing.lg,
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
  termsText: {
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
    lineHeight: 18,
  },
  benefitsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.lg,
  },
  benefitsList: {
    gap: Spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  benefitIcon: {
    fontSize: 16,
    color: Colors.success[500],
    fontWeight: '600',
  },
  benefitText: {
    fontSize: 14,
    color: Colors.neutral[600],
    flex: 1,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  loginText: {
    fontSize: 14,
    color: Colors.neutral[600],
  },
});