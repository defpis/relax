import { clamp, throttle } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState, RefObject } from 'react';
import { useToggle } from './useToggle';

interface IPosition {
  offsetX: number;
  offsetY: number;
}

export function useMouseDrag<T extends HTMLElement>(
  element: T | null,
): [RefObject<T>, IPosition, Dispatch<SetStateAction<IPosition>>] {
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
  const startDrag = useCallback(
    (event: MouseEvent) => {
      setPosition(event);
      toggle(true);
    },
    [toggle, setPosition],
  );
  const dragging = useCallback((event: MouseEvent) => setPosition(event), [setPosition]);
  const stopDrag = useCallback(() => toggle(false), [toggle]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousedown', startDrag);
    return () => {
      element.removeEventListener('mousedown', startDrag);
    };
  }, [startDrag]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !start) return;

    element.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', stopDrag);
    return () => {
      element.removeEventListener('mousemove', dragging);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [start, dragging, stopDrag]);

  return [ref, pos, setPos];
}
