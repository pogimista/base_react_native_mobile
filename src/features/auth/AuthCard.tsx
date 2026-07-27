import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../shared/ui/Button';
import { TextField } from '../../shared/ui/TextField';
import { useAuth } from '../../shared/auth/AuthContext';
import { Colors } from '../../shared/theme/colors';
import { useTheme } from '../../shared/theme/ThemeContext';

export function AuthCard() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  // Everything auth-related — current user, loading flag, sign in/out — comes
  // from context instead of being passed down as props from a parent screen.
  const { user, isLoading, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');

  if (user) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Context API auth demo</Text>
        <Text style={styles.status}>Signed in as {user.email}</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Context API auth demo</Text>
      <TextField
        placeholder="jane@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Sign in" loading={isLoading} disabled={!email} onPress={() => signIn(email)} />
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
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
    status: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
  });
}
