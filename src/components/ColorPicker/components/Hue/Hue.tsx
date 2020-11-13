import { round } from 'lodash';
import React from 'react';
import { defaultHSVA, IHSVA } from '../../ColorPicker';
import { useAfterMounted, useMount, useMouseDrag, useSyncState } from '../../hooks';
import './Hue.scss';

export interface IHueProps {
  width?: number;
  height?: number;
  hsva?: IHSVA;
  onChange?: (value: IHSVA) => void;
}

export const Hue: React.FC<IHueProps> = ({ width = 600, height = 30, hsva: value = defaultHSVA, onChange }) => {
  const [ref, pos, setPos] = useMouseDrag<HTMLDivElement>(null);
  const [, setHSVA] = useSyncState<IHSVA>(value, onChange);

  useAfterMounted(() => {
    const element = ref.current;
    if (!element) return;
    const h = round((pos.offsetX / element.clientWidth) * 360);
    setHSVA((oldState) => ({ ...oldState, h }));
  }, [pos]);

  useMount(() => {
    const element = ref.current;
    if (!element) return;
    setPos((oldState) => ({ ...oldState, offsetX: (value.h * element.clientWidth) / 360 }));
  });

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }} className="color-picker-wrapper color-picker-hue">
      <div ref={ref} className="hue">
        <div
          className="hue-thumb"
          style={{
            left: `${pos.offsetX}px`,
          }}
        />
      </div>
    </div>
  );
};
