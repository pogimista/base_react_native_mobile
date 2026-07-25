import { createPostSchema } from './schema';

describe('createPostSchema', () => {
  it('accepts a valid title and body', () => {
    const result = createPostSchema.safeParse({ title: 'Hello', body: 'World' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty title', () => {
    const result = createPostSchema.safeParse({ title: '', body: 'World' });
    expect(result.success).toBe(false);
  });

  it('rejects an empty body', () => {
    const result = createPostSchema.safeParse({ title: 'Hello', body: '' });
    expect(result.success).toBe(false);
  });
});
