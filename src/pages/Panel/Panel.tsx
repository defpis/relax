import React, { useRef, useEffect } from 'react';
import './Panel.scss';

const createShader = (gl: WebGLRenderingContext, sourceCode: string, type: number) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Error on createShader...');
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);
  return shader;
};

const VSHADER_SCURCE_CODE = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
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
    const gl = canvasReference.current?.getContext('webgl');
    if (!gl) throw new Error('Error on getContext...');
    const program = gl.createProgram();
    if (!program) throw new Error('Error on createProgram...');
    const vertexShader = createShader(gl, VSHADER_SCURCE_CODE, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, FSHADER_SCURCE_CODE, gl.FRAGMENT_SHADER);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    const vertices = new Float32Array([-1, 1, -1, -1, 1, -1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, []);

  return (
    <div className="panel">
      <canvas ref={canvasReference} className="renderer" />
    </div>
  );
};
