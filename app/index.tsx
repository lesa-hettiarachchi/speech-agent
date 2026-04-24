import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ACTIVITIES, type Activity } from '../data/activities';

const C = {
  background:   '#1A1F2E',
  surface:      '#252B3B',
  onBackground: '#F9FAFB',
  onSurface:    '#D1D5DB',
  primary:      '#1A9B7B',
};

function ActivityCard({ activity }: { activity: Activity }) {
  const bg = activity.categoryColour + '22';
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/activity/${activity.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.cardTop}>
        <Text style={styles.emoji}>{activity.emoji}</Text>
        <View style={[styles.badge, { backgroundColor: bg }]}>
          <Text style={[styles.badgeText, { color: activity.categoryColour }]}>
            Activity {activity.activityNumber}
          </Text>
        </View>
        <Text style={styles.speakerIcon}>🔊</Text>
      </View>

      <Text style={styles.activityName}>{activity.name}</Text>

      <View style={styles.cardBottom}>
        <View style={[styles.categoryChip, { backgroundColor: bg }]}>
          <Text style={[styles.categoryText, { color: activity.categoryColour }]}>
            {activity.category}
          </Text>
        </View>
        <Text style={styles.stepCount}>{activity.steps.length} steps</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>STEMM Lab</Text>
          <TouchableOpacity onPress={() => router.push('/settings')} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={24} color={C.onSurface} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Choose an activity to get started</Text>
      </View>
      <FlatList
        data={ACTIVITIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityCard activity={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.background },
  header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 12 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontSize: 28, fontWeight: '700', color: C.onBackground, marginBottom: 4 },
  subtitle: { fontSize: 14, color: C.onSurface },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: C.surface, borderRadius: 16, padding: 20 },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  emoji: { fontSize: 28 },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  speakerIcon: { fontSize: 18, marginLeft: 'auto' },
  activityName: { fontSize: 18, fontWeight: '600', color: C.onBackground, marginBottom: 14 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  categoryChip: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  categoryText: { fontSize: 12, fontWeight: '600' },
  stepCount: { fontSize: 13, color: C.onSurface },
});
