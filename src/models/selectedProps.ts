import { createModel } from '@rematch/core';
import { RootModel } from '.';

export type Position = {
  x: number;
  y: number;
};

export type BaseProps = {
  width: number;
  height: number;
  angle: number;
} & Position;

export type FillProps = {
  color: number;
};

export type SelectedProps = {
  base: BaseProps;
  fill: FillProps;
};

export const selectedProps = createModel<RootModel>()({
  state: {
    base: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      angle: 0,
    },
    fill: {
      color: 0x000000,
    },
  },
  reducers: {
    updateBaseProps: (state: SelectedProps, payload: Partial<BaseProps>) => {
      return {
        ...state,
        base: {
          ...state.base,
          ...payload,
        },
      };
    },
    updateFillProps: (state: SelectedProps, payload: Partial<FillProps>) => {
      return {
        ...state,
        fill: {
          ...state.fill,
          ...payload,
        },
      };
    },
  },
});
