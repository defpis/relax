import { TodoItemData } from "@/typings";
import { put, takeEvery } from "redux-saga/effects";
import {
  ADD_TODO_ITEM,
  LOAD_TODO_LIST,
  appendTodoItem,
  resetTodoList,
  AddTodoAction,
  startLoading,
  stopLoading,
} from "@/actions";

const todoList: TodoItemData[] = [
  {
    uuid: 1,
    title: "redux-saga",
    content:
      "redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。",
  },
];

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

export function* addTodoItemAsync() {
  yield takeEvery(ADD_TODO_ITEM, function* ({ payload }: AddTodoAction) {
    yield put(startLoading());
    yield delay(500);
    const todoItem = {
      uuid: todoList.length + 1,
      ...payload,
    };
    todoList.push(todoItem);
    yield put(appendTodoItem(todoItem));
    yield put(stopLoading());
  });
}

export function* loadTodoListAsync() {
  yield takeEvery(LOAD_TODO_LIST, function* () {
    yield put(startLoading());
    yield delay(1000);
    yield put(resetTodoList(todoList));
    yield put(stopLoading());
  });
}
