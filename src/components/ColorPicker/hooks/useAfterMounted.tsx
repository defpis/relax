import { useEffect, EffectCallback, DependencyList, useRef } from 'react';

export function useAfterMounted(effect: EffectCallback, deps?: DependencyList): void {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
