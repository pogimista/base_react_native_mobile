import { useCounterStore } from './store';

describe('useCounterStore', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  it('starts at zero', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('increments', () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('decrements', () => {
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(-1);
  });

  it('resets to zero after changes', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
  });
});
