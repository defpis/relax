import { ColorPicker } from '@/components';
import React from 'react';
import './Demo.scss';

export const Demo: React.FC<{}> = () => {
  return (
    <div className="demo">
      <ColorPicker />
    </div>
  );
};
