import { APPEND_TODO_ITEM, RESET_TODO_LIST, TodoAction } from "@/actions";
import { TodoItemData } from "@/typings";

// 所有拆分的reducer都以单一函数作为导出，不要导出任何其他东西
export default function (
  state: TodoItemData[] = [],
  action: TodoAction
): TodoItemData[] {
  switch (action.type) {
    case APPEND_TODO_ITEM: {
      return [...state, action.payload];
    }
    case RESET_TODO_LIST: {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
}
