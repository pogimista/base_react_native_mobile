import { profileSchema } from './schema';

describe('profileSchema', () => {
  it('accepts a valid name and email', () => {
    const result = profileSchema.safeParse({ name: 'Jane Doe', email: 'jane@example.com' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty name', () => {
    const result = profileSchema.safeParse({ name: '', email: 'jane@example.com' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is required');
    }
  });

  it('rejects a malformed email', () => {
    const result = profileSchema.safeParse({ name: 'Jane Doe', email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Enter a valid email');
    }
  });
});
