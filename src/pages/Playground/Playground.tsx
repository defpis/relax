import React from 'react';
import './Playground.scss';
import { PropList } from './PropList';
import { MainCanvas } from './MainCanvas';

export const Playground: React.FC<{}> = () => {
  return (
    <div id="playground">
      <PropList />
      <MainCanvas />
    </div>
  );
};
