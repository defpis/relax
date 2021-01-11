import { BaseProps, FillProps } from '@/models/selectedProps';
import { Dispatch, RootState } from '@/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PropList.scss';

export const PropList: React.FC<{}> = () => {
  const dispatch = useDispatch<Dispatch>();
  const baseProps = useSelector<RootState, BaseProps>((state) => state.selectedProps.base);
  const FillProps = useSelector<RootState, FillProps>((state) => state.selectedProps.fill);

  const setPosition = (key: 'x' | 'y', val: number) => {
    dispatch.selectedProps.updateBaseProps({ [key]: val });
  };

  const setColor = (color: number) => {
    dispatch.selectedProps.updateFillProps({ color });
  };

  return (
    <div id="prop-list">
      <label htmlFor="X">
        <span>X: </span>
        <input
          id="X"
          type="number"
          value={baseProps.x}
          onChange={(event) => setPosition('x', Number(event.target.value))}
        />
      </label>
      <label htmlFor="Y">
        <span>Y: </span>
        <input
          id="Y"
          type="number"
          value={baseProps.y}
          onChange={(event) => setPosition('y', Number(event.target.value))}
        />
      </label>
      <label htmlFor="COLOR">
        <span>COLOR: </span>
        <input
          id="COLOR"
          type="string"
          value={FillProps.color.toString(16)}
          onChange={(event) => setColor(Number.parseInt(event.target.value, 16))}
        />
      </label>
    </div>
  );
};
