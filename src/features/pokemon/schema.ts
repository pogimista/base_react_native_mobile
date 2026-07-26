import { z } from 'zod';

export const pokemonSummarySchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const pokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonSummarySchema),
});

export type PokemonSummary = z.infer<typeof pokemonSummarySchema>;
export type PokemonList = z.infer<typeof pokemonListSchema>;

export function getPokemonId(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

export function getPokemonImageUrl(url: string): string {
  const id = getPokemonId(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getNextOffset(nextUrl: string | null): number | undefined {
  if (!nextUrl) {
    return undefined;
  }
  const match = nextUrl.match(/[?&]offset=(\d+)/);
  return match ? Number(match[1]) : undefined;
}
