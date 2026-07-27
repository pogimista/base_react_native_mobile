import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPokemonList } from '../api';
import { getNextOffset } from '../schema';

export function usePokemonListQuery() {
  return useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => getNextOffset(lastPage.next),
    // Loaded only via pull-to-refresh (see PokemonScreen), not automatically on mount,
    // so a previously persisted cache is shown as-is until the user asks for fresh data.
    enabled: false,
  });
}
