import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../src/shared/ui/Button';
import { colors } from '../src/shared/theme/colors';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.body}>This screen lives at app/about.tsx.</Text>
      <Button title="Go back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
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
