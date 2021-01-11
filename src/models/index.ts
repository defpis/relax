import { Models } from '@rematch/core';
import { selectedProps } from './selectedProps';
import { selectedList } from './selectedList';

export interface RootModel extends Models<RootModel> {
  selectedProps: typeof selectedProps;
  selectedList: typeof selectedList;
}

export const models: RootModel = { selectedProps, selectedList };
