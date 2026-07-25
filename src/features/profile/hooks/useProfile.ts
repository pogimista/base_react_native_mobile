import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchProfile, saveProfile } from '../api';
import type { ProfileFormValues } from '../schema';

const PROFILE_QUERY_KEY = ['profile'];

export function useProfileQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchProfile,
  });
}

export function useSaveProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ProfileFormValues) => saveProfile(values),
    onSuccess: (values) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, values);
    },
  });
}
