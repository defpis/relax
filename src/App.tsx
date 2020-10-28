import { TodoItemData } from "./typings";
import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList/TodoList";
import { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { addTodoItem, loadTodoList } from "./actions";

const App: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector<RootState, boolean>((state) => state.loading);
  const todoList = useSelector<RootState, TodoItemData[]>(
    (state) => state.todo
  );

  const [todo, setTodo] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    dispatch(loadTodoList());
  }, []);

  return (
    <div>
      <p>
        <label htmlFor="title">
          标题:
          <input
            name="title"
            type="text"
            value={todo.title}
            onChange={(ev) =>
              setTodo((s: any) => ({ ...s, title: ev.target.value }))
            }
          />
        </label>
      </p>
      <p>
        <label htmlFor="content">
          内容:
          <textarea
            name="content"
            value={todo.content}
            onChange={(ev) =>
              setTodo((s: any) => ({ ...s, content: ev.target.value }))
            }
          />
        </label>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch(addTodoItem(todo));
          }}
        >
          添加
        </button>
        <button onClick={() => dispatch(loadTodoList())}>刷新</button>
      </p>
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} />}
    </div>
  );
};

export default App;
