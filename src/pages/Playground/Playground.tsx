import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import './Playground.scss';

let app: PIXI.Application;

function initApp(view: HTMLCanvasElement) {
  app = new PIXI.Application({
    view,
    backgroundColor: 0xffffff,
    autoDensity: true,
    resolution: window.devicePixelRatio,
    resizeTo: window,
  });

  const graphics = new PIXI.Graphics();
  graphics.beginFill(0x000000).drawRect(0, 0, 100, 100).endFill();
  app.stage.addChild(graphics);
}

export const Playground: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const view = canvasRef.current;
    if (!view) return;
    initApp(view);
  }, []);

  return (
    <div className="playground">
      <canvas ref={canvasRef} />
    </div>
  );
};
