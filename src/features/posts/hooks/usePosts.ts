import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPost, deletePost, fetchPosts, renamePost } from '../api';
import type { CreatePostInput, Post } from '../schema';

const POSTS_QUERY_KEY = ['posts'];

export function usePostsQuery() {
  return useQuery({ queryKey: POSTS_QUERY_KEY, queryFn: fetchPosts });
}

// JSONPlaceholder is a fake REST API — it responds successfully to writes but
// doesn't actually persist them, so each mutation below patches the cached
// list directly instead of refetching (a refetch would just show the old data).

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: (created) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (posts = []) => [created, ...posts]);
    },
  });
}

export function useRenamePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) => renamePost(id, title),
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (posts = []) =>
        posts.map((post) => (post.id === id ? { ...post, title: updated.title } : post)),
      );
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (posts = []) =>
        posts.filter((post) => post.id !== id),
      );
    },
  });
}
