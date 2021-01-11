import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import './Playground.scss';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import './StateManage';

export let app: PIXI.Application;

function initApp(view: HTMLCanvasElement) {
  const ratio = window.devicePixelRatio;

  app = new PIXI.Application({
    view,
    backgroundColor: 0xffffff,
    antialias: true,
    autoDensity: true,
    resolution: ratio,
    resizeTo: window,
    preserveDrawingBuffer: true,
  });

  const graphics = new PIXI.Graphics();
  graphics.beginFill(0xff0000).drawRect(0, 0, 50, 50).endFill();
  graphics.beginFill(0x00ff00).drawRect(50, 0, 50, 50).endFill();
  graphics.beginFill(0x0000ff).drawRect(100, 0, 50, 50).endFill();
  graphics.position.set(200, 200);
  app.stage.addChild(graphics);

  const text = new PIXI.Text('This is a text.');
  text.position.set(100, 100);
  app.stage.addChild(text);

  const glass = document.querySelector('#glass') as HTMLCanvasElement;
  const ctx = glass.getContext('2d') as CanvasRenderingContext2D;
  const gridCount = 19;
  const scale = 1;

  const mousemove$ = fromEvent<MouseEvent>(view, 'mousemove');
  mousemove$.pipe(throttleTime(20)).subscribe((event) => {
    const rect = view.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) * ratio - glass.width / 2 / scale;
    const offsetY = (event.clientY - rect.top) * ratio - glass.height / 2 / scale;
    const gridWidth = glass.width / gridCount;
    const gridHeight = glass.height / gridCount;
    const glassCenter = {
      x: (gridCount / 2 - 0.5) * gridWidth,
      y: (gridCount / 2 - 0.5) * gridHeight,
    };

    ctx.clearRect(0, 0, glass.width, glass.height);
    ctx.imageSmoothingEnabled = false; // 关闭抗锯齿
    ctx.drawImage(view, offsetX, offsetY, glass.width / scale, glass.height / scale, 0, 0, glass.width, glass.height);
    const imageData = ctx.getImageData(
      glass.width / 2 - gridCount / ratio,
      glass.height / 2 - gridCount / ratio,
      gridCount,
      gridCount,
    );

    const data = imageData.data;
    for (let y = 0; y < gridCount; y++) {
      for (let x = 0; x < gridCount; x++) {
        const index = (y * gridCount + x) * 4;
        const r = data[index + 0];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fillRect(x * gridWidth, y * gridHeight, gridWidth, gridHeight);
      }
    }

    ctx.beginPath();
    ctx.strokeStyle = '#c4c4c4';
    ctx.lineWidth = 1;
    for (let x = 0; x < glass.width; x += gridWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, glass.height);
    }
    for (let y = 0; y < glass.height; y += gridHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(glass.width, y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.rect(glassCenter.x, glassCenter.y, gridWidth, gridHeight);
    ctx.stroke();
  });
}

export const Playground: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const view = canvasRef.current;
    if (!view) return;
    initApp(view);
  }, []);

  return (
    <div id="playground">
      <canvas ref={canvasRef} />
      <canvas id="glass" width="200" height="200" />
    </div>
  );
};
