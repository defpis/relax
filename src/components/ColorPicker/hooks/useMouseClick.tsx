import { useEffect, useRef, useState, RefObject } from 'react';

interface IPosition {
  offsetX: number;
  offsetY: number;
}

export function useMouseClick<T extends HTMLElement>(element: T | null): [RefObject<T>, IPosition] {
  const ref = useRef<T>(element);
  const [pos, setPos] = useState<IPosition>({ offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.addEventListener('click', (event) => {
      const { offsetX, offsetY } = event;
      setPos({ offsetX, offsetY });
    });
  }, []);

  return [ref, pos];
}
