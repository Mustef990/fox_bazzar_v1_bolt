import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'medium',
  style 
}: BadgeProps) {
  return (
    <View style={[
      styles.badge,
      styles[`variant_${variant}`],
      styles[`size_${size}`],
      style
    ]}>
      <Text style={[styles.text, styles[`textSize_${size}`]]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  size_small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  size_medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  size_large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  variant_default: {
    backgroundColor: '#f1f5f9',
  },
  variant_success: {
    backgroundColor: '#059669',
  },
  variant_warning: {
    backgroundColor: '#f59e0b',
  },
  variant_error: {
    backgroundColor: '#ef4444',
  },
  variant_info: {
    backgroundColor: '#3b82f6',
  },
  text: {
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  textSize_small: {
    fontSize: 10,
  },
  textSize_medium: {
    fontSize: 12,
  },
  textSize_large: {
    fontSize: 14,
  },
});