import { apiClient } from '../../lib/api-client';
import type { CreatePostInput, Post } from './schema';

const DEMO_USER_ID = 1;

export function fetchPosts() {
  return apiClient.get<Post[]>(`/posts?userId=${DEMO_USER_ID}&_limit=5`);
}

export function createPost(input: CreatePostInput) {
  return apiClient.post<Post>('/posts', { ...input, userId: DEMO_USER_ID });
}

export function renamePost(id: number, title: string) {
  return apiClient.patch<Post>(`/posts/${id}`, { title });
}

export function deletePost(id: number) {
  return apiClient.delete(`/posts/${id}`);
}
