import { TodoItemData } from "@/typings";
import React from "react";

const TodoItem: React.FC<TodoItemData> = ({ title, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default TodoItem;
