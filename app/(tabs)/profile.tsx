import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { Settings, Crown, User, Mail, Award, Calendar } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { user } = state;

  if (!user) {
    return (
      <View style={styles.container} testID="profile-loading">
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    dispatch({ type: 'SET_USER', payload: null as any });
    router.replace('/welcome');
  };

  const getSubscriptionBadgeColor = () => {
    switch (user.subscription.plan) {
      case 'lifetime':
        return Colors.warning[500];
      case 'annual':
        return Colors.primary[600];
      case 'monthly':
        return Colors.success[500];
      default:
        return Colors.neutral[400];
    }
  };

  return (
    <View style={styles.container} testID="profile-container">
      <View style={styles.header} testID="profile-header">
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* User Info Card */}
        <Card elevated shadow="md" style={styles.userCard} testID="user-info-card">
          <View style={styles.userHeader}>
            <View style={styles.avatar} testID="user-avatar">
              <User size={32} color={Colors.white} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name || 'HSK Student'}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
            <View
              style={[
                styles.subscriptionBadge,
                { backgroundColor: getSubscriptionBadgeColor() },
              ]}
              testID="subscription-badge"
            >
              <Crown size={12} color={Colors.white} />
              <Text style={styles.subscriptionText}>
                {user.subscription.plan.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.levelSection} testID="level-section">
            <View style={styles.levelInfo}>
              <Award size={20} color={Colors.primary[600]} />
              <Text style={styles.levelText}>Current Level: HSK {user.provisionalLevel}</Text>
            </View>
            <Button
              title="Take Placement Test"
              onPress={() => router.push('/placement-quiz')}
              variant="outline"
              size="sm"
              testID="retake-placement"
            />
          </View>
        </Card>

        {/* Quick Stats */}
        <Card elevated shadow="md" style={styles.statsCard} testID="quick-stats">
          <Text style={styles.cardTitle}>Study Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.studyStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.totalTestsTaken}</Text>
              <Text style={styles.statLabel}>Tests Taken</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.averageScore}%</Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
          </View>
        </Card>

        {/* Subscription Info */}
        <Card elevated shadow="md" style={styles.subscriptionCard} testID="subscription-info">
          <Text style={styles.cardTitle}>Subscription</Text>
          <View style={styles.subscriptionInfo}>
            <View style={styles.subscriptionDetails}>
              <Text style={styles.subscriptionPlan}>
                {user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)} Plan
              </Text>
              <Text style={styles.subscriptionStatus}>
                Status: {user.subscription.status}
              </Text>
              {user.subscription.plan !== 'lifetime' && (
                <Text style={styles.subscriptionExpiry}>
                  Expires: {user.subscription.expiresAt.toLocaleDateString()}
                </Text>
              )}
            </View>
            <Button
              title="Manage Subscription"
              onPress={() => router.push('/subscription')}
              variant="outline"
              size="sm"
              testID="manage-subscription"
            />
          </View>
        </Card>

        {/* Menu Options */}
        <Card elevated shadow="md" style={styles.menuCard} testID="menu-options">
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/settings')}
            testID="settings-menu"
          >
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={Colors.neutral[600]} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/help')}
            testID="help-menu"
          >
            <View style={styles.menuItemLeft}>
              <Mail size={20} color={Colors.neutral[600]} />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        {/* Logout */}
        <View style={styles.logoutContainer} testID="logout-container">
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            size="md"
            fullWidth
            testID="logout-button"
          />
        </View>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  userCard: {
    marginBottom: Spacing.lg,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.neutral[600],
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    gap: Spacing.xs,
  },
  subscriptionText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.white,
  },
  levelSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[700],
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
  subscriptionCard: {
    marginBottom: Spacing.lg,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionDetails: {
    flex: 1,
  },
  subscriptionPlan: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  subscriptionStatus: {
    fontSize: 14,
    color: Colors.success[600],
    marginBottom: Spacing.xs,
  },
  subscriptionExpiry: {
    fontSize: 12,
    color: Colors.neutral[500],
  },
  menuCard: {
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.neutral[700],
  },
  menuItemArrow: {
    fontSize: 20,
    color: Colors.neutral[400],
  },
  logoutContainer: {
    marginBottom: Spacing.xl,
  },
});