import { Image } from 'expo-image';
import { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../shared/ui/Button';
import { colors } from '../../../shared/theme/colors';
import { usePokemonListQuery } from '../hooks/usePokemon';
import { getPokemonId, getPokemonImageUrl, PokemonSummary } from '../schema';

const ROW_HEIGHT = 72;
const ROW_SPACING = 12;
const ITEM_HEIGHT = ROW_HEIGHT + ROW_SPACING;

export function PokemonScreen() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonListQuery();

  const pokemon = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: PokemonSummary }) => <PokemonRow pokemon={item} />,
    [],
  );

  const getItemLayout = useCallback(
    (_data: ArrayLike<PokemonSummary> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  if (isLoading) {
    return <ActivityIndicator style={styles.center} />;
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Failed to load pokemon.</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={pokemon}
      keyExtractor={keyExtractor}
      onRefresh={refetch}
      refreshing={isRefetching}
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null}
    />
  );
}

function keyExtractor(item: PokemonSummary) {
  return item.url;
}

const PokemonRow = memo(function PokemonRow({ pokemon }: { pokemon: PokemonSummary }) {
  const id = getPokemonId(pokemon.url);

  return (
    <View style={styles.row}>
      <Image
        source={getPokemonImageUrl(pokemon.url)}
        style={styles.image}
        contentFit="contain"
        transition={200}
      />
      <Text style={styles.id}>#{String(id).padStart(3, '0')}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {pokemon.name}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  content: {
    padding: 20,
    gap: 12,
  },
  footer: {
    paddingVertical: 20,
  },
  row: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: ROW_SPACING,
  },
  image: {
    width: 48,
    height: 48,
  },
  id: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
});
