import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<any>;
  gradient?: string[];
  color?: string;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient,
  color = '#3b82f6'
}: StatCardProps) {
  if (gradient) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={gradient}
          style={styles.gradientCard}
        >
          <View style={styles.iconContainer}>
            <Icon size={24} color="#fff" />
          </View>
          <Text style={styles.gradientValue}>{value}</Text>
          <Text style={styles.gradientTitle}>{title}</Text>
          {change && (
            <Text style={styles.gradientChange}>{change}</Text>
          )}
        </LinearGradient>
      </View>
    );
  }

  return (
    <Card style={styles.container} padding="large">
      <View style={[styles.icon, { backgroundColor: color }]}>
        <Icon size={20} color="#fff" />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {change && (
        <Text style={[styles.change, { color }]}>{change}</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  gradientCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  gradientValue: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  gradientTitle: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 8,
  },
  change: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradientChange: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});