import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../src/shared/ui/Button';
import { Colors } from '../src/shared/theme/colors';
import { useTheme } from '../src/shared/theme/ThemeContext';

export default function AboutScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.body}>This screen lives at app/about.tsx.</Text>
      <Button title="Go back" onPress={() => router.back()} />
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      gap: 12,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },
    body: {
      fontSize: 16,
      color: colors.textMuted,
    },
  });
}
