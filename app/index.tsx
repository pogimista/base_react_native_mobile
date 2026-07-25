import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { CounterCard } from '../src/features/counter/CounterCard';
import { ProfileForm } from '../src/features/profile/ProfileForm';
import { colors } from '../src/shared/theme/colors';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>my-app</Text>
      <Link href="/about" style={styles.link}>
        Go to About →
      </Link>
      <Link href="/posts" style={styles.link}>
        Go to Posts (API CRUD demo) →
      </Link>
      <CounterCard />
      <ProfileForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});
