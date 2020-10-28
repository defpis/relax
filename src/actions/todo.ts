import { TodoItemData } from "@/typings";

// 全部大写的都是`ActionType`
export const ADD_TODO_ITEM = "ADD_TODO_ITEM";
export const APPEND_TODO_ITEM = "APPEND_TODO_ITEM";
export const LOAD_TODO_LIST = "LOAD_TODO_LIST";
export const RESET_TODO_LIST = "RESET_TODO_LIST";

export type AddTodoItemData = Omit<TodoItemData, "uuid">;

// 大驼峰且以`Action`结尾的都是类型
export interface AddTodoAction {
  type: typeof ADD_TODO_ITEM;
  payload: AddTodoItemData;
}

export interface AppendTodoAction {
  type: typeof APPEND_TODO_ITEM;
  payload: TodoItemData;
}

export interface LoadTodoListAction {
  type: typeof LOAD_TODO_LIST;
}

export interface ResetTodoListAction {
  type: typeof RESET_TODO_LIST;
  payload: TodoItemData[];
}

// 合并所有动作类型
export type TodoAction =
  | AddTodoAction
  | AppendTodoAction
  | LoadTodoListAction
  | ResetTodoListAction;

// addTodoItem -> http -> appendTodoItem
export const addTodoItem = (todoItem: AddTodoItemData): AddTodoAction => ({
  type: ADD_TODO_ITEM,
  payload: todoItem,
});

export const appendTodoItem = (todoItem: TodoItemData): AppendTodoAction => ({
  type: APPEND_TODO_ITEM,
  payload: todoItem,
});

// loadTodoList -> http -> resetTodoList
export const loadTodoList = (): LoadTodoListAction => ({
  type: LOAD_TODO_LIST,
});

export const resetTodoList = (
  todoList: TodoItemData[]
): ResetTodoListAction => ({
  type: RESET_TODO_LIST,
  payload: todoList,
});
