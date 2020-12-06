import { delay } from '@/utils';
import { createModel } from '@rematch/core';
import { RootModel } from '.';

export type CounterState = number;

export const counter = createModel<RootModel>()({
  state: 0,
  reducers: {
    increment: (state: CounterState, payload: number = 1) => {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload: number = 1 /*, rootState: RootState*/): Promise<void> {
      await delay(1000);
      dispatch.counter.increment(payload);
    },
  }),
});
