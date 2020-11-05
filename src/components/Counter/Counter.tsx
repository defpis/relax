import React, { useState } from 'react';

export const Counter: React.FC<{
  min?: number;
  max?: number;
}> = ({ min = 0, max = 10 }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button type="button" onClick={() => setCount((s) => (s < max ? s + 1 : s))}>
        增加
      </button>
      <button type="button" onClick={() => setCount((s) => (s > min ? s - 1 : 0))}>
        减少
      </button>
    </>
  );
};
