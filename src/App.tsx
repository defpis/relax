import React from "react";
import Counter from "./component/Counter/Counter";

const App: React.FC<{}> = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <Counter />
    </div>
  );
};

export default App;
