import { useEffect, useRef, useState, RefObject } from 'react';
import { resizeCanvas } from '../utils';
import { useMouseMove } from './useMouseMove';

export function useColorDip<T extends HTMLCanvasElement>(
  element: T | null,
): [RefObject<T>, (status?: boolean) => void, string] {
  const [ref1, pos, start, toggle] = useMouseMove<T>(element);
  const ref2 = useRef<HTMLCanvasElement | null>(null);
  const [rgba, setRGBA] = useState('rgba(0, 0, 0, 1)');

  useEffect(() => {
    if (start) {
      const element = ref1.current;
      if (!element) return;
      const magnifier = document.createElement('canvas');
      magnifier.className = 'magnifier';
      // 插入到下一个节点
      const parent = element.parentNode;
      if (!parent) return;
      if (parent.lastChild === element) {
        parent.append(magnifier);
      } else {
        parent.insertBefore(magnifier, element.nextSibling);
      }
      resizeCanvas(magnifier);
      ref2.current = magnifier;
      return () => {
        magnifier.remove();
      };
    } else {
      ref2.current = null;
    }
  }, [ref1, start]);

  useEffect(() => {
    const element = ref1.current;
    if (!element) return;
    const context1 = element.getContext('2d');
    if (!context1) return;

    const magnifier = ref2.current;
    if (!magnifier) return;
    const context2 = magnifier.getContext('2d');
    if (!context2) return;

    context2.clearRect(0, 0, magnifier.width, magnifier.height);
    const ratio = window.devicePixelRatio;
    // 获取的坐标会比真实canvas的坐标小两倍
    const offsetX = pos.offsetX * ratio;
    const offsetY = pos.offsetY * ratio;
    const { width, height } = magnifier;
    const scale = 10;
    const x = offsetX - width / 2 / scale;
    const y = offsetY - height / 2 / scale;
    context2.drawImage(element, x, y, width / scale, height / scale, 0, 0, width, height);

    context2.beginPath();
    context2.strokeStyle = '#d7d7d7';
    context2.lineWidth = 1;
    const gridNumber = 10;
    const stepWidth = width / gridNumber;
    for (let index = stepWidth / 2; index < width; index += stepWidth) {
      context2.moveTo(index, 0);
      context2.lineTo(index, height);
    }
    const stepHeight = height / gridNumber;
    for (let index = stepHeight / 2; index < height; index += stepHeight) {
      context2.moveTo(0, index);
      context2.lineTo(width, index);
    }
    context2.stroke();

    context2.beginPath();
    context2.lineWidth = 1;
    context2.strokeStyle = '#ff0000';
    context2.rect(width / 2 - stepWidth / 2, height / 2 - stepHeight / 2, stepWidth, stepHeight);
    context2.stroke();

    const [r, g, b, a] = context1.getImageData(offsetX, offsetY, 1, 1).data;
    setRGBA(`rgba(${r}, ${g}, ${b}, ${a / 255})`);

    context2.fillStyle = '#ff0000';
    context2.textAlign = 'center';
    context2.font = '20px Arial';
    context2.fillText(`${r} ${g} ${b}`, width / 2, height / 2 + 60);
  }, [ref1, pos]);

  return [ref1, toggle, rgba];
}
