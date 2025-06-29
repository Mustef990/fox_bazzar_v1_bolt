import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ChipProps {
  label: string;
  count?: number;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function Chip({ 
  label, 
  count, 
  selected = false, 
  onPress,
  style 
}: ChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && styles.selectedChip,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
      {count !== undefined && (
        <Text style={[styles.count, selected && styles.selectedCount]}>
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  selectedChip: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    marginRight: 8,
  },
  selectedLabel: {
    color: '#fff',
  },
  count: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    textAlign: 'center',
  },
  selectedCount: {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});