import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../shared/ui/Button';
import { Colors } from '../../shared/theme/colors';
import { useTheme } from '../../shared/theme/ThemeContext';
import { useCounterStore } from './store';

export function CounterCard() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Zustand counter</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.row}>
        <View style={styles.buttonWrap}>
          <Button title="-" onPress={decrement} />
        </View>
        <View style={styles.buttonWrap}>
          <Button title="+" onPress={increment} />
        </View>
      </View>
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      gap: 12,
      alignItems: 'center',
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
    count: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    buttonWrap: {
      width: 56,
    },
  });
}
