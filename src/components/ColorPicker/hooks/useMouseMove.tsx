import { clamp, throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState, RefObject } from 'react';
import { useToggle } from './useToggle';

interface IPosition {
  offsetX: number;
  offsetY: number;
}

export function useMouseMove<T extends HTMLElement>(
  element: T | null,
): [RefObject<T>, IPosition, boolean, (status?: boolean) => void] {
  const ref = useRef<T>(element);
  const [start, toggle] = useToggle(false);
  const [pos, setPos] = useState<IPosition>({ offsetX: 0, offsetY: 0 });

  const setPosition = useMemo(
    () =>
      throttle(({ clientX, clientY }: MouseEvent) => {
        const element = ref.current;
        if (!element) return;

        const { left, top } = element.getBoundingClientRect();
        const offsetX = clamp(clientX - left, 0, element.clientWidth);
        const offsetY = clamp(clientY - top, 0, element.clientHeight);
        setPos({ offsetX, offsetY });
      }, 40),
    [],
  );
  const moving = useCallback((event: MouseEvent) => setPosition(event), [setPosition]);
  const stopMove = useCallback(() => toggle(false), [toggle]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !start) return;

    element.addEventListener('mousemove', moving);
    document.addEventListener('click', stopMove);
    return () => {
      element.removeEventListener('mousemove', moving);
      document.removeEventListener('click', stopMove);
    };
  }, [start, moving, stopMove]);

  return [ref, pos, start, toggle];
}
