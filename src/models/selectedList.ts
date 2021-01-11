import { CapabilityType, DisplayObject } from '@/Renderer';
import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const selectedList = createModel<RootModel>()({
  state: [] as DisplayObject[],
  reducers: {
    appendSelect: (state: DisplayObject[], payload: DisplayObject) => {
      return [...state, payload];
    },
    setSelect: (_, payload: DisplayObject[]) => {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async AsyncSetSelectAndUpdateProps(payload: DisplayObject[]) {
      dispatch.selectedList.setSelect(payload);
      if (payload.length === 0) {
        console.log('Empty selectedList');
      } else if (payload.length === 1) {
        const selectedItem = payload[0];
        const baseProps = selectedItem.capabilities.get(CapabilityType.Base)?.props;
        const fillProps = selectedItem.capabilities.get(CapabilityType.Fill)?.props;
        baseProps && dispatch.selectedProps.updateBaseProps(baseProps);
        fillProps && dispatch.selectedProps.updateFillProps(fillProps);
      } else if (payload.length > 1) {
        // multiple select
      }
    },
  }),
});
