/**
 * One class per business operation. Keeps orchestration/validation logic out
 * of repositories (data access) and out of hooks (presentation wiring).
 */
export abstract class BaseUseCase<TInput, TOutput> {
  abstract execute(input: TInput): Promise<TOutput>;
}
