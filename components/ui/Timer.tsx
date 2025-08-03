import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/colors';

interface TimerProps {
  duration: number; // in seconds
  onExpire: () => void;
  onWarning?: (timeLeft: number) => void;
  warningThresholds?: number[]; // in seconds
  paused?: boolean;
  testID?: string;
}

export const Timer: React.FC<TimerProps> = ({
  duration,
  onExpire,
  onWarning,
  warningThresholds = [300, 60], // 5 min, 1 min
  paused = false,
  testID,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [hasWarned, setHasWarned] = useState<Set<number>>(new Set());

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getTimerColor = useCallback((): string => {
    if (timeLeft <= 60) return Colors.error[500];
    if (timeLeft <= 300) return Colors.warning[500];
    return Colors.neutral[700];
  }, [timeLeft]);

  useEffect(() => {
    if (paused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        
        // Check for warnings
        warningThresholds.forEach(threshold => {
          if (newTime === threshold && !hasWarned.has(threshold)) {
            onWarning?.(newTime);
            setHasWarned(prev => new Set([...prev, threshold]));
          }
        });

        if (newTime <= 0) {
          onExpire();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, paused, onExpire, onWarning, warningThresholds, hasWarned]);

  return (
    <View style={styles.container} testID={testID}>
      <Text style={[styles.timeText, { color: getTimerColor() }]}>
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.sm,
    backgroundColor: Colors.neutral[50],
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
});