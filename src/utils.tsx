
import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { Accessor } from 'solid-js';

export function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}

export function removeIndex<T>(array: readonly T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}


type FN<Arguments extends unknown[], Return extends unknown = void> = (
  ...args: Arguments
) => Return;
type MaybeAccessor<T = unknown> = Accessor<T> | T;
const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
  typeof value === 'function';
const unwrap = <T,>(maybeValue: MaybeAccessor<T>): T =>
  isFunction(maybeValue) ? maybeValue() : maybeValue;

export const createScheduler = <T, U>({
  loop,
  callback,
  cancel,
  schedule,
}: {
  loop?: MaybeAccessor<boolean>;
  callback: MaybeAccessor<FN<[U]>>;
  cancel: FN<[T]>;
  schedule: (callback: FN<[U]>) => T;
}): (() => void) => {
  let tickId: T;
  const work = (): void => {
    if (unwrap(loop)) tick();
    unwrap(callback);
  };

  const tick = (): void => {
    tickId = schedule(work);
  };

  const dispose = (): void => {
    cancel(tickId);
  };

  tick();
  return dispose;
};

export const createAnimationLoop = (callback: FrameRequestCallback) =>
  createScheduler({
    callback,
    loop: true,
    cancel: cancelAnimationFrame,
    schedule: requestAnimationFrame,
  });


