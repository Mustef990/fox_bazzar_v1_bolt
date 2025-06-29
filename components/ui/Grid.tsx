import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface GridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  spacing?: number;
}

export default function Grid({ 
  children, 
  columns = 2, 
  spacing = 16 
}: GridProps) {
  const itemWidth = (width - (spacing * (columns + 1))) / columns;
  
  return (
    <View style={[styles.container, { gap: spacing }]}>
      {React.Children.map(children, (child, index) => (
        <View style={[styles.item, { width: itemWidth }]}>
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    marginBottom: 16,
  },
});