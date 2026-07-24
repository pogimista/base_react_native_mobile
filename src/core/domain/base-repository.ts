/**
 * Base contract for CRUD-style resource repositories (e.g. a Todos or Posts
 * feature backed by a REST collection). Not every repository fits this shape
 * — auth, for instance, isn't a CRUD resource — so those implement their own
 * narrow interface (see features/auth/domain/auth-repository.interface.ts)
 * instead of extending this class.
 */
export abstract class BaseRepository<TEntity, TId = string> {
  abstract getById(id: TId): Promise<TEntity>;
  abstract getAll(): Promise<TEntity[]>;
  abstract create(payload: Partial<TEntity>): Promise<TEntity>;
  abstract update(id: TId, payload: Partial<TEntity>): Promise<TEntity>;
  abstract remove(id: TId): Promise<void>;
}
