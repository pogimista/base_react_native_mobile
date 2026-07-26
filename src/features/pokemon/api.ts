import { createApiClient } from '../../lib/api-client';
import type { PokemonList } from './schema';

const pokemonApiClient = createApiClient('https://pokeapi.co/api/v2');

const PAGE_SIZE = 20;

export function fetchPokemonList(offset: number) {
  return pokemonApiClient.get<PokemonList>(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
}
