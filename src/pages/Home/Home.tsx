import React from 'react';
import './Home.scss';
import { ping } from '@/apis';

export const Home: React.FC<{}> = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => ping().then(console.log)}>测试</button>
    </div>
  );
};
