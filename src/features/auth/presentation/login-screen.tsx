import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { z } from 'zod';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { useLogin } from '../application/use-login';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginScreen() {
  const login = useLogin();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((values) => login.mutate(values));

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log in</ThemedText>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.backgroundSelected }]}
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      {errors.email && <ThemedText type="small">{errors.email.message}</ThemedText>}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.backgroundSelected }]}
            placeholder="Password"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      {errors.password && <ThemedText type="small">{errors.password.message}</ThemedText>}

      {login.isError && <ThemedText type="small">{login.error.message}</ThemedText>}

      <Pressable
        onPress={onSubmit}
        disabled={login.isPending}
        style={[styles.button, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText type="smallBold">{login.isPending ? 'Logging in…' : 'Log in'}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    padding: Spacing.two,
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    padding: Spacing.three,
  },
});
