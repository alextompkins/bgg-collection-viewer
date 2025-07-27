import type { ComponentChildren, Context } from 'preact';
import { useContext, useState } from 'preact/hooks';

interface StoreProviderProps<S> {
  storeFn: () => S;
  context: Context<S | undefined>;
  children: ComponentChildren;
}

export const StoreProvider = <S,>({ storeFn, context, children }: StoreProviderProps<S>) => {
  const [store] = useState<S>(storeFn());

  return <context.Provider value={store}>{children}</context.Provider>;
};

export const useStore = <S,>(context: Context<S>) => {
  const store = useContext(context);

  if (!store)
    throw new Error('useStore must be called within a StoreProvider for the given context');
  return store;
};
