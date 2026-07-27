import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getFavoritePokemon, setFavoritePokemon } from '../storage';

const FAVORITES_QUERY_KEY = ['pokemon', 'favorites'];

export function useFavoritePokemonQuery() {
  return useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: getFavoritePokemon,
    initialData: [] as string[],
  });
}

export function useToggleFavoritePokemonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (url: string) => {
      const favorites = queryClient.getQueryData<string[]>(FAVORITES_QUERY_KEY) ?? [];
      const next = favorites.includes(url)
        ? favorites.filter((favorite) => favorite !== url)
        : [...favorites, url];
      await setFavoritePokemon(next);
      return next;
    },
    onSuccess: (next) => {
      queryClient.setQueryData(FAVORITES_QUERY_KEY, next);
    },
  });
}
