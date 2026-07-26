import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPokemonList } from '../api';
import { getNextOffset } from '../schema';

export function usePokemonListQuery() {
  return useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => getNextOffset(lastPage.next),
  });
}
