import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SettingsProvider } from '../context/SettingsContext';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#1A1F2E' } }} />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </SettingsProvider>
  );
}
