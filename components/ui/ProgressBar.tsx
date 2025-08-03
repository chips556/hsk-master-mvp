import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Colors, BorderRadius } from '@/constants/colors';

interface ProgressBarProps {
  percentage: number;
  height?: number;
  animated?: boolean;
  color?: string;
  backgroundColor?: string;
  testID?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = 8,
  animated = true,
  color = Colors.primary[600],
  backgroundColor = Colors.neutral[200],
  testID,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(percentage, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = percentage;
    }
  }, [percentage, animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
        },
      ]}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.progress,
          {
            height: height - 2,
            backgroundColor: color,
            borderRadius: (height - 2) / 2,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 1,
  },
  progress: {
    alignSelf: 'flex-start',
  },
});