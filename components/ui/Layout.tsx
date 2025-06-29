import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { spacing } from '@/constants/theme';

interface LayoutProps {
  children: React.ReactNode;
  padding?: keyof typeof spacing;
  scrollable?: boolean;
}

export default function Layout({ 
  children, 
  padding = 'xl',
  scrollable = true 
}: LayoutProps) {
  const containerStyle = [
    styles.container,
    { padding: spacing[padding] }
  ];

  if (scrollable) {
    return (
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.scrollContainer, containerStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flexGrow: 1,
  },
});