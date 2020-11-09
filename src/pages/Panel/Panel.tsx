import { mathjs, lodash } from '@/utils';
import React, { useRef, useEffect } from 'react';
import './Panel.scss';

const genRotateMatrix = (angle: number, aroundAxis: 'x' | 'y' | 'z' = 'z') => {
  const r = (angle / 180) * mathjs.pi;
  const s = mathjs.sin(r);
  const c = mathjs.cos(r);

  const matrixMap = {
    x: mathjs.matrix([
      [1, 0, 0, 0],
      [0, c, -s, 0],
      [0, s, c, 0],
      [0, 0, 0, 1],
    ]),
    y: mathjs.matrix([
      [c, 0, s, 0],
      [0, 1, 0, 0],
      [-s, 0, c, 0],
      [0, 0, 0, 1],
    ]),
    z: mathjs.matrix([
      [c, -s, 0, 0],
      [s, c, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]),
  };

  return lodash.flatten(matrixMap[aroundAxis].toArray() as number[][]);
};

const createShader = (gl: WebGLRenderingContext, sourceCode: string, type: number) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Error on createShader...');

  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  return shader;
};

const VSHADER_SCURCE_CODE = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    void main() {
        gl_Position = u_ModelMatrix * a_Position;
    }
`;

const FSHADER_SCURCE_CODE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

export const Panel: React.FC<{}> = () => {
  const canvasReference = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasReference.current;
    if (!canvas) throw new Error('Error on get canvas...');

    const gl = canvas?.getContext('webgl', { antialias: true });
    if (!gl) throw new Error('Error on getContext...');

    const program = gl.createProgram();
    if (!program) throw new Error('Error on createProgram...');

    const vertexShader = createShader(gl, VSHADER_SCURCE_CODE, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, FSHADER_SCURCE_CODE, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([0, mathjs.sqrt(3) / 3, -0.5, -mathjs.sqrt(3) / 6, 0.5, -mathjs.sqrt(3) / 6]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');

    gl.clearColor(255, 255, 255, 1);

    let currentAngle = 0;
    let lastTimestamp = Date.now();

    const animate = () => {
      const now = Date.now();
      const duration = now - lastTimestamp;
      lastTimestamp = now;
      currentAngle = currentAngle + (duration / 3000) * 180;
    };

    const resize = () => {
      const displayWidth = canvas.clientWidth * window.devicePixelRatio;
      const displayHeight = canvas.clientHeight * window.devicePixelRatio;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    };

    const draw = () => {
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniformMatrix4fv(u_ModelMatrix, false, genRotateMatrix(currentAngle));
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    (function tick() {
      animate();
      draw();
      requestAnimationFrame(tick);
    })();
  }, []);

  return (
    <div className="panel">
      <canvas ref={canvasReference} className="renderer" />
    </div>
  );
};
