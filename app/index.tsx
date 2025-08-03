import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { Colors } from '@/constants/colors';

export default function IndexScreen() {
  const router = useRouter();
  const { state } = useAppContext();

  useEffect(() => {
    if (!state.isLoading) {
      if (state.isAuthenticated && state.user) {
        // Check if user has completed onboarding
        if (state.user.subscription.plan === 'free') {
          router.replace('/pricing');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        router.replace('/welcome');
      }
    }
  }, [state.isLoading, state.isAuthenticated, state.user]);

  return (
    <View style={styles.container} testID="index-loading">
      {/* Loading screen - could add a splash screen here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
});