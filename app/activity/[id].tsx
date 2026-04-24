import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InstructionCard from '../../components/InstructionCard';
import ProgressDots from '../../components/ProgressDots';
import SpeechControls from '../../components/SpeechControls';
import { useSettings } from '../../context/SettingsContext';
import { ACTIVITIES } from '../../data/activities';
import { useSpeechPlayer } from '../../hooks/useSpeechPlayer';

const C = {
  background: '#1A1F2E',
  surface: '#252B3B',
  onBackground: '#F9FAFB',
  onSurface: '#D1D5DB',
  primary: '#1A9B7B',
};

export default function ActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ttsEnabled } = useSettings();
  const activity = ACTIVITIES.find((a) => a.id === id);

  const {
    currentStepIndex,
    isPlaying,
    isDone,
    rate,
    highlightRange,
    hasPlayedOnce,
    play,
    stop,
    nextStep,
    prevStep,
    goToStep,
    setRate,
  } = useSpeechPlayer(activity?.steps ?? []);

  if (!activity) return null;

  const step = activity.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === activity.steps.length - 1;

  const handleNext = () => ttsEnabled ? nextStep() : goToStep(currentStepIndex + 1);
  const handlePrev = () => ttsEnabled ? prevStep() : goToStep(currentStepIndex - 1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {activity.emoji}  {activity.name}
        </Text>
      </View>

      <ProgressDots totalSteps={activity.steps.length} currentIndex={currentStepIndex} />

      <InstructionCard
        step={step}
        stepNumber={currentStepIndex + 1}
        isSpeaking={ttsEnabled && isPlaying}
        highlightRange={ttsEnabled ? highlightRange : undefined}
      />

      <View style={styles.controls}>
        {ttsEnabled ? (
          <SpeechControls
            isPlaying={isPlaying}
            isDone={isDone}
            rate={rate}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onPlay={play}
            onStop={stop}
            onNext={handleNext}
            onPrev={handlePrev}
            onSetRate={setRate}
          />
        ) : (
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navButton, isFirstStep && styles.navDisabled]}
              onPress={handlePrev}
              disabled={isFirstStep}
              activeOpacity={0.7}
            >
              <Text style={[styles.navText, isFirstStep && styles.navTextDim]}>← Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButton, isLastStep && styles.navDisabled]}
              onPress={handleNext}
              disabled={isLastStep}
              activeOpacity={0.7}
            >
              <Text style={[styles.navText, isLastStep && styles.navTextDim]}>Next →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {ttsEnabled && !hasPlayedOnce && (
        <Text style={styles.bottomTip}>💡 Tap ▶ to hear this step read aloud</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: { paddingVertical: 4 },
  backText: { fontSize: 16, color: C.primary, fontWeight: '600' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: C.onBackground, flex: 1 },
  controls: { paddingTop: 16 },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: C.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
  navDisabled: { opacity: 0.3 },
  navText: { fontSize: 15, fontWeight: '600', color: C.onBackground },
  navTextDim: { color: C.onSurface },
  bottomTip: {
    textAlign: 'center',
    fontSize: 13,
    color: C.onSurface,
    paddingHorizontal: 24,
    paddingBottom: 12,
    marginTop: 8,
  },
});
