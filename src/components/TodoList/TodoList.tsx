import { TodoItemData } from "@/typings";
import React from "react";
import TodoItem from "./TodoItem";

const TodoList: React.FC<{
  todoList: TodoItemData[];
}> = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((item) => (
        <li key={item.uuid}>
          <TodoItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
