import React, { useCallback, useEffect, useState } from 'react';
import './ColorPicker.scss';
import { Saturation, Hue, Alpha } from './components';
import { useColorDip } from './hooks';
import { hsv2hsl, resizeCanvas } from './utils';

export interface IHSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}

export const defaultHSVA: IHSVA = { h: 0, s: 0, v: 1, a: 1 };

export const ColorPicker: React.FC<{}> = () => {
  const [hsva, setHSVA] = useState(defaultHSVA);
  // console.log(`hsva: ${JSON.stringify(hsva)}`);

  const handleChange = useCallback((v) => setHSVA(v), []);

  const hsl = hsv2hsl(hsva);
  const color = `hsl(${hsva.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)`;

  const [ref, toggle, rgba] = useColorDip<HTMLCanvasElement>(null);
  console.log(rgba);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    resizeCanvas(element);
    const context1 = element.getContext('2d');
    if (!context1) return;
    context1.fillStyle = '#fff';
    context1.fillRect(0, 0, element.width, element.height);
    context1.fillStyle = color;
    context1.fillRect(0, 0, element.width / 2, element.height);
  }, [ref, color]);

  return (
    <div className="color-picker">
      <Saturation hsva={hsva} onChange={handleChange} />
      <Hue hsva={hsva} onChange={handleChange} />
      <Alpha hsva={hsva} onChange={handleChange} />
      <div style={{ backgroundColor: color, opacity: `${hsva.a * 100}%` }} className="color-picker-block" />
      <div>HSVA: {JSON.stringify(hsva)}</div>
      <button onClick={() => toggle()}>取色</button>
      <div className="color-picker-wrapper color-picker-workspace">
        <canvas ref={ref} className="workspace" />
      </div>
    </div>
  );
};
