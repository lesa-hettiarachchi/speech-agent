import { router } from 'expo-router';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';

const C = {
  background:     '#1A1F2E',
  surface:        '#252B3B',
  onBackground:   '#F9FAFB',
  onSurface:      '#D1D5DB',
  primary:        '#1A9B7B',
};

export default function SettingsScreen() {
  const { ttsEnabled, setTtsEnabled } = useSettings();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.rowInfo}>
            <Text style={styles.rowLabel}>Text to Speech</Text>
            <Text style={styles.rowDesc}>Read activity instructions aloud</Text>
          </View>
          <Switch
            value={ttsEnabled}
            onValueChange={setTtsEnabled}
            trackColor={{ false: '#3A3F52', true: C.primary }}
            thumbColor={C.onBackground}
            ios_backgroundColor="#3A3F52"
          />
        </View>
      </View>

      <Text style={styles.hint}>
        {ttsEnabled
          ? 'Voice is on — tap ▶ on any step to hear it read aloud.'
          : 'Voice is off — steps display as text only.'}
      </Text>
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
  backText: { fontSize: 16, fontWeight: '600', color: C.primary },
  title: { fontSize: 20, fontWeight: '700', color: C.onBackground },
  section: {
    margin: 16,
    backgroundColor: C.surface,
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  rowInfo: { flex: 1, marginRight: 12 },
  rowLabel: { fontSize: 16, fontWeight: '600', color: C.onBackground },
  rowDesc: { fontSize: 13, color: C.onSurface, marginTop: 2 },
  hint: {
    fontSize: 13,
    color: C.onSurface,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
