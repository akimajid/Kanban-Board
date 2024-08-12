import React from "react";

const Task = ({ task, onMoveLeft, onMoveRight, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-between">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onMoveLeft(task.id)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Move Left
        </button>
        <button
          onClick={() => onMoveRight(task.id)}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Move Right
        </button>
        <button
          onClick={() => onEdit(task.id)}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
