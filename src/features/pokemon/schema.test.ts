import { getNextOffset, getPokemonId, getPokemonImageUrl, pokemonListSchema } from './schema';

describe('pokemonListSchema', () => {
  it('accepts a valid PokeAPI list response', () => {
    const result = pokemonListSchema.safeParse({
      count: 1302,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
    });
    expect(result.success).toBe(true);
  });

  it('rejects a response missing results', () => {
    const result = pokemonListSchema.safeParse({ count: 1302, next: null, previous: null });
    expect(result.success).toBe(false);
  });
});

describe('getPokemonId', () => {
  it('extracts the pokedex number from a pokemon url', () => {
    expect(getPokemonId('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
  });

  it('returns 0 for an unrecognized url', () => {
    expect(getPokemonId('https://pokeapi.co/api/v2/pokemon/')).toBe(0);
  });
});

describe('getPokemonImageUrl', () => {
  it('builds a sprite url from the pokedex number', () => {
    expect(getPokemonImageUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    );
  });
});

describe('getNextOffset', () => {
  it('extracts the offset from a next page url', () => {
    expect(getNextOffset('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')).toBe(20);
  });

  it('returns undefined when there is no next page', () => {
    expect(getNextOffset(null)).toBeUndefined();
  });
});
