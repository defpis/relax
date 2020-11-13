import { round } from 'lodash';
import { IHSVA } from './ColorPicker';

export const hsv2hsl = ({ h, s, v }: IHSVA): { h: number; s: number; l: number } => {
  return {
    h,
    s: round((s * v) / ((h = (2 - s) * v) < 1 ? h : 2 - h) || 0, 2),
    l: round(h / 2, 2),
  };
};

export const resizeCanvas = (canvas: HTMLCanvasElement): void => {
  const ratio = window.devicePixelRatio;
  canvas.width = canvas.clientWidth * ratio;
  canvas.height = canvas.clientHeight * ratio;
};
