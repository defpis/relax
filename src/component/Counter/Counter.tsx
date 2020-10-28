import React, { useState } from "react";

const Counter: React.FC<{}> = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount((s) => s + 1)}>增加</button>
      <button onClick={() => setCount((s) => (s > 0 ? s - 1 : 0))}>减少</button>
    </>
  );
};

export default Counter;
