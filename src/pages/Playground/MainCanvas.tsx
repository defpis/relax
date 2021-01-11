import React, { useEffect, useRef } from 'react';
import './MainCanvas.scss';
import * as PIXI from 'pixi.js';
import { Rect } from '@/Renderer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const initApp = (view: HTMLCanvasElement) => {
  const ratio = window.devicePixelRatio;

  const app = new PIXI.Application({
    view,
    backgroundColor: 0xefefef,
    antialias: true,
    autoDensity: true,
    resolution: ratio,
    resizeTo: window,
    preserveDrawingBuffer: true,
  });

  const rect1 = new Rect(new PIXI.Graphics(), {
    base: { x: 100, y: 100, width: 100, height: 100 },
    fill: { color: 0xffff00 },
  });
  rect1.appendTo(app.stage);

  const rect2 = new Rect(new PIXI.Graphics(), {
    base: { x: 200, y: 200, width: 100, height: 100 },
    fill: { color: 0xff00ff },
  });
  rect2.appendTo(app.stage);
};

export const MainCanvas: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { selectedList, selectedProps } = useSelector<RootState, RootState>((state) => state);

  useEffect(() => {
    const view = canvasRef.current;
    if (!view) return;
    initApp(view);
  }, []);

  useEffect(() => {
    selectedList.forEach((selectedItem) => selectedItem.draw(selectedProps));
  }, [selectedList, selectedProps]);

  return <canvas id="main-canvas" ref={canvasRef} />;
};
