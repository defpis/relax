import { all, fork } from "redux-saga/effects";
import { addTodoItemAsync, loadTodoListAsync } from "./todo";

export default function* () {
  yield all([fork(addTodoItemAsync), fork(loadTodoListAsync)]);
}
