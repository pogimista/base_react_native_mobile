import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../shared/ui/Button';
import { TextField } from '../../shared/ui/TextField';
import { useProfileQuery, useSaveProfileMutation } from './hooks/useProfile';
import { profileSchema, ProfileFormValues } from './schema';

export function ProfileForm() {
  const { data: profile, isLoading } = useProfileQuery();
  const saveProfile = useSaveProfileMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '' },
  });

  useEffect(() => {
    if (profile) reset(profile);
  }, [profile, reset]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Hook Form + Zod + React Query</Text>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            label="Name"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.name?.message}
            placeholder="Jane Doe"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            label="Email"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.email?.message}
            placeholder="jane@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />

      <Button
        title={saveProfile.isSuccess ? 'Saved' : 'Save profile'}
        loading={isLoading || saveProfile.isPending}
        onPress={handleSubmit((values) => saveProfile.mutate(values))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
});
