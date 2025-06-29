import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  action?: React.ReactNode;
}

export default function Section({ 
  title, 
  subtitle, 
  children, 
  style,
  action 
}: SectionProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {action && <View style={styles.action}>{action}</View>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    marginTop: 2,
    textAlign: 'right',
  },
  action: {
    marginLeft: 16,
  },
});