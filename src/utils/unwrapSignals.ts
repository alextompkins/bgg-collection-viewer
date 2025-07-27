import type { Signal } from '@preact/signals';

export type UnwrapSignal<T> = T extends Signal<infer V> ? V : never;
export type UnwrapSignals<R extends Record<string, unknown>> = {
  [K in keyof R as UnwrapSignal<R[K]> extends never ? never : K]: UnwrapSignal<R[K]>;
};
