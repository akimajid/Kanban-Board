import React from "react";
import Task from "./Task";

const Board = ({ title, descriptions, tasks, onMoveLeft, onMoveRight, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="mb-4">{descriptions}</p>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onMoveLeft={onMoveLeft}
          onMoveRight={onMoveRight}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Board;
