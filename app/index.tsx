import { Link } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { CounterCard } from '../src/features/counter/CounterCard';
import { ProfileForm } from '../src/features/profile/ProfileForm';
import { Button } from '../src/shared/ui/Button';
import { Colors } from '../src/shared/theme/colors';
import { useTheme } from '../src/shared/theme/ThemeContext';

export default function HomeScreen() {
  const { mode, colors, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>my-app</Text>
      <Button title={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onPress={toggleTheme} />
      <Link href="/about" style={styles.link}>
        Go to About →
      </Link>
      <Link href="/posts" style={styles.link}>
        Go to Posts (API CRUD demo) →
      </Link>
      <Link href="/pokemon" style={styles.link}>
        Go to Pokemon (API GET demo) →
      </Link>
      <CounterCard />
      <ProfileForm />
    </ScrollView>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
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
}
