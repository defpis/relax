import { round } from 'lodash';
import React from 'react';
import { useAfterMounted, useMount, useMouseDrag, useSyncState } from '../../hooks';
import { hsv2hsl } from '../../utils';
import { defaultHSVA, IHSVA } from '../../ColorPicker';
import './Alpha.scss';

export interface IAlphaProps {
  width?: number;
  height?: number;
  hsva?: IHSVA;
  onChange?: (value: IHSVA) => void;
}

export const Alpha: React.FC<IAlphaProps> = ({ width = 600, height = 30, hsva: value = defaultHSVA, onChange }) => {
  const [ref, pos, setPos] = useMouseDrag<HTMLDivElement>(null);
  const [hsva, setHSVA] = useSyncState<IHSVA>(value, onChange);

  useAfterMounted(() => {
    const element = ref.current;
    if (!element) return;
    const a = round(pos.offsetX / element.clientWidth, 2);
    setHSVA((oldState) => ({ ...oldState, a }));
  }, [pos]);

  useMount(() => {
    const element = ref.current;
    if (!element) return;
    setPos((oldState) => ({ ...oldState, offsetX: value.a * element.clientWidth }));
  });

  const hsl = hsv2hsl(hsva);
  const color = `hsl(${hsva.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)`;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRightColor: color,
      }}
      className="color-picker-wrapper color-picker-alpha"
    >
      <div
        ref={ref}
        className="alpha"
        style={{
          background: `linear-gradient(to right, transparent, ${color})`,
        }}
      >
        <div
          className="alpha-thumb"
          style={{
            left: `${pos.offsetX}px`,
          }}
        />
      </div>
    </div>
  );
};
