import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/colors';

interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  shadow?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
  testID?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  shadow = 'sm',
  style,
  padding = 'md',
  testID,
}) => {
  const getShadowStyle = () => {
    if (!elevated) return {};

    switch (shadow) {
      case 'lg':
        return {
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
          elevation: 8,
        };
      case 'md':
        return {
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        };
      default:
        return {
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 2,
        };
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: Colors.white,
          borderRadius: BorderRadius.lg,
          padding: Spacing[padding],
        },
        getShadowStyle(),
        style,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
};