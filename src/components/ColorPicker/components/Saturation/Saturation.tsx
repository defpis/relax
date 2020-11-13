import { round } from 'lodash';
import React from 'react';
import { defaultHSVA, IHSVA } from '../../ColorPicker';
import { useAfterMounted, useMount, useMouseDrag, useSyncState } from '../../hooks';
import './Saturation.scss';

export interface ISaturationProps {
  width?: number;
  height?: number;
  hsva?: IHSVA;
  onChange?: (value: IHSVA) => void;
}

export const Saturation: React.FC<ISaturationProps> = ({
  width = 600,
  height = 400,
  hsva: value = defaultHSVA,
  onChange,
}) => {
  const [ref, pos, setPos] = useMouseDrag<HTMLDivElement>(null);
  const [hsva, setHSVA] = useSyncState<IHSVA>(value, onChange);

  useAfterMounted(() => {
    const element = ref.current;
    if (!element) return;
    const s = round(pos.offsetX / element.clientWidth, 2);
    const v = round((element.clientHeight - pos.offsetY) / element.clientHeight, 2);
    setHSVA((oldState) => ({ ...oldState, s, v }));
  }, [pos]);

  useMount(() => {
    const element = ref.current;
    if (!element) return;
    setPos((oldState) => ({
      ...oldState,
      offsetX: value.s * element.clientWidth,
      offsetY: (1 - value.v) * element.clientHeight,
    }));
  });

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="color-picker-wrapper color-picker-saturation"
    >
      <div ref={ref} style={{ background: `hsl(${hsva.h}, 100%, 50%)` }} className="saturation">
        <div
          className="saturation-thumb"
          style={{
            left: `${pos.offsetX}px`,
            top: `${pos.offsetY}px`,
            borderColor: pos.offsetY < height / 2 ? 'black' : 'white',
          }}
        />
      </div>
    </div>
  );
};
