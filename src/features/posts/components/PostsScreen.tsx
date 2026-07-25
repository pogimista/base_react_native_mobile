import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../shared/ui/Button';
import { TextField } from '../../../shared/ui/TextField';
import { colors } from '../../../shared/theme/colors';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  usePostsQuery,
  useRenamePostMutation,
} from '../hooks/usePosts';
import { createPostSchema, CreatePostInput, Post } from '../schema';

export function PostsScreen() {
  const { data: posts, isLoading, isError, refetch, isRefetching } = usePostsQuery();
  const createPost = useCreatePostMutation();
  const renamePost = useRenamePostMutation();
  const deletePost = useDeletePostMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', body: '' },
  });

  const onCreate = handleSubmit((values) => {
    createPost.mutate(values, { onSuccess: () => reset() });
  });

  if (isLoading) {
    return <ActivityIndicator style={styles.center} />;
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Failed to load posts.</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={posts}
      keyExtractor={(post) => String(post.id)}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListHeaderComponent={
        <View style={styles.form}>
          <Text style={styles.heading}>Create post (POST)</Text>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                label="Title"
                value={field.value}
                onChangeText={field.onChange}
                error={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="body"
            render={({ field }) => (
              <TextField
                label="Body"
                value={field.value}
                onChangeText={field.onChange}
                error={errors.body?.message}
              />
            )}
          />
          <Button title="Create" loading={createPost.isPending} onPress={onCreate} />
        </View>
      }
      renderItem={({ item }) => (
        <PostRow
          post={item}
          onRename={() => renamePost.mutate({ id: item.id, title: `${item.title} (edited)` })}
          onDelete={() => deletePost.mutate(item.id)}
          renaming={renamePost.isPending && renamePost.variables?.id === item.id}
          deleting={deletePost.isPending && deletePost.variables === item.id}
        />
      )}
    />
  );
}

type PostRowProps = {
  post: Post;
  onRename: () => void;
  onDelete: () => void;
  renaming: boolean;
  deleting: boolean;
};

function PostRow({ post, onRename, onDelete, renaming, deleting }: PostRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body} numberOfLines={2}>
          {post.body}
        </Text>
      </View>
      <View style={styles.rowActions}>
        <Button title="Rename (PATCH)" onPress={onRename} loading={renaming} />
        <Button title="Delete" onPress={onDelete} loading={deleting} />
      </View>
    </View>
  );
}

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
  form: {
    gap: 12,
    marginBottom: 12,
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  row: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 12,
  },
  rowText: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    color: colors.textMuted,
  },
  rowActions: {
    flexDirection: 'row',
    gap: 12,
  },
});
