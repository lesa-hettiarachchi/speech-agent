import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const C = {
  primary:   '#1A9B7B',
  success:   '#10B981',
  onSurface: '#D1D5DB',
};

interface Props {
  totalSteps: number;
  currentIndex: number;
}

export default function ProgressDots({ totalSteps, currentIndex }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex && styles.dotActive,
              i < currentIndex && styles.dotCompleted,
            ]}
          />
        ))}
      </View>
      <Text style={styles.counter}>Step {currentIndex + 1} of {totalSteps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 12 },
  dotsRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: C.onSurface,
    backgroundColor: 'transparent',
  },
  dotActive:    { backgroundColor: C.primary,  borderColor: C.primary },
  dotCompleted: { backgroundColor: C.success,  borderColor: C.success },
  counter: { fontSize: 12, fontWeight: '600', letterSpacing: 1, color: C.onSurface },
});
