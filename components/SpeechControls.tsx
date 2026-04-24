import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const C = {
  primary:        '#1A9B7B',
  surface:        '#252B3B',
  surfaceVariant: '#2E3549',
  onBackground:   '#F9FAFB',
  onSurface:      '#D1D5DB',
  error:          '#EF4444',
};

const SPEEDS = [
  { label: '0.8×', value: 0.8 },
  { label: '1×',   value: 1.0 },
  { label: '1.2×', value: 1.2 },
];

interface Props {
  isPlaying: boolean;
  isDone: boolean;
  rate: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPlay: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSetRate: (value: number) => void;
}

export default function SpeechControls({
  isPlaying, isDone, rate,
  isFirstStep, isLastStep,
  onPlay, onStop, onNext, onPrev, onSetRate,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <TouchableOpacity
          style={[styles.navButton, isFirstStep && styles.disabled]}
          onPress={onPrev}
          disabled={isFirstStep}
          activeOpacity={0.7}
        >
          <Text style={[styles.navText, isFirstStep && styles.dimText]}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.stopButton, { opacity: isPlaying ? 1 : 0 }]}
          onPress={onStop}
          disabled={!isPlaying}
          activeOpacity={0.7}
        >
          <Text style={styles.stopText}>■</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={onPlay} activeOpacity={0.8}>
          <Text style={styles.playText}>{isDone ? '↺' : '▶'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isLastStep && styles.disabled]}
          onPress={onNext}
          disabled={isLastStep}
          activeOpacity={0.7}
        >
          <Text style={[styles.navText, isLastStep && styles.dimText]}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.speedContainer}>
        <Text style={styles.speedLabel}>Reading speed</Text>
        <View style={styles.speedRow}>
          {SPEEDS.map((s) => {
            const active = Math.abs(rate - s.value) < 0.01;
            return (
              <TouchableOpacity
                key={s.value}
                style={[styles.speedButton, active && styles.speedButtonActive]}
                onPress={() => onSetRate(s.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.speedText, active && styles.speedTextActive]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const btn = { alignItems: 'center' as const, justifyContent: 'center' as const };
const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 8 },
  mainRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 },
  navButton: { ...btn, width: 48, height: 48, borderRadius: 24, backgroundColor: C.surface },
  navText: { fontSize: 20, color: C.onBackground },
  disabled: { opacity: 0.3 },
  dimText: { color: C.onSurface },
  stopButton: { ...btn, width: 48, height: 48, borderRadius: 24, backgroundColor: C.surface },
  stopText: { fontSize: 18, color: C.error },
  playButton: { ...btn, width: 68, height: 68, borderRadius: 34, backgroundColor: C.primary },
  playText: { fontSize: 26, color: C.onBackground },
  speedContainer: { alignItems: 'center' },
  speedLabel: { fontSize: 12, fontWeight: '600', color: C.onSurface, marginBottom: 8, letterSpacing: 0.5 },
  speedRow: { flexDirection: 'row', gap: 8 },
  speedButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: C.surfaceVariant },
  speedButtonActive: { backgroundColor: C.primary },
  speedText: { fontSize: 12, fontWeight: '700', color: C.onSurface },
  speedTextActive: { color: C.onBackground },
});
