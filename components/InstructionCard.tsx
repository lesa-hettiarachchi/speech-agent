import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Step } from '../data/activities';

const C = {
  primary:        '#1A9B7B',
  surface:        '#252B3B',
  surfaceVariant: '#2E3549',
  onBackground:   '#F9FAFB',
  onSurface:      '#D1D5DB',
  highlight:      '#1A9B7B44',
};

interface Props {
  step: Step;
  stepNumber: number;
  isSpeaking: boolean;
  highlightRange: { start: number; end: number } | null;
}

export default function InstructionCard({ step, stepNumber, isSpeaking, highlightRange }: Props) {
  const renderText = () => {
    if (!highlightRange) {
      return <Text style={styles.stepText}>{step.text}</Text>;
    }
    const { start, end } = highlightRange;
    const before = step.text.slice(0, start);
    const highlighted = step.text.slice(start, end);
    const after = step.text.slice(end);
    return (
      <Text style={styles.stepText}>
        {before}
        <Text style={styles.highlightedText}>{highlighted}</Text>
        {after}
      </Text>
    );
  };

  return (
    <View style={[styles.card, isSpeaking && styles.cardActive]}>
      <Text style={styles.stepLabel}>STEP {stepNumber}</Text>
      <View style={styles.textContainer}>
        {renderText()}
      </View>
      {step.tip ? (
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>💡 {step.tip}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 24,
    flex: 1,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  cardActive: { borderLeftColor: C.primary },
  stepLabel: { fontSize: 12, fontWeight: '600', letterSpacing: 1, color: C.primary, marginBottom: 16 },
  textContainer: { flex: 1 },
  stepText: { fontSize: 20, fontWeight: '500', lineHeight: 30, color: C.onBackground },
  highlightedText: { backgroundColor: C.highlight, fontWeight: '700' },
  tipBox: { backgroundColor: C.surfaceVariant, borderRadius: 8, padding: 12, marginTop: 20 },
  tipText: { fontSize: 14, fontWeight: '400', lineHeight: 20, color: C.onSurface },
});
