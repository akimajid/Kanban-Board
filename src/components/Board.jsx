import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi"; // Import the icon
import Task from "./Task";
import TaskModal from "./TaskModal";

const backgroundColors = [
  "rgba(1, 149, 159, 0.2)",
  "rgba(254, 234, 188, 0.2)",
  "rgba(245, 177, 183, 0.2)",
  "rgba(184, 219, 202, 0.2)",
];

const Board = ({
  title,
  descriptions,
  tasks,
  onMoveLeft,
  onMoveRight,
  onEdit,
  onDelete,
  todoId, // Add todoId as a prop
}) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openModal = () => setIsTaskModalOpen(true);
  const closeModal = () => setIsTaskModalOpen(false);

  const randomColor =
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  const borderColor = randomColor.replace("1", "1");

  return (
    <div
      className="p-4 rounded-lg shadow-md w-full"
      style={{
        backgroundColor: randomColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      <h2
        className="text-xs font-semibold mb-4 inline-block"
        style={{
          border: `1px solid black`,
          padding: "4px 8px",
          borderRadius: "6px",
          borderWidth: "2px",
          borderColor: "black",
          backgroundColor: "white",
          color: "black",
        }}
      >
        {title}
      </h2>
      <p className="mb-4 text-xs font-semibold">{descriptions}</p>
      {tasks.length === 0 ? (
        <div className="px-4 rounded-md py-2 bg-white text-gray-500">
          No Task
        </div>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onMoveLeft={onMoveLeft}
            onMoveRight={onMoveRight}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
      <div className="mt-4">
        <button
          onClick={openModal}
          className="text-xs text-black px-4 py-2 rounded-md flex items-center"
        >
          <FiPlusCircle className="mr-2" size={20} /> {/* Add the icon */}
          New Task
        </button>

        <TaskModal isOpen={isTaskModalOpen} onClose={closeModal} todoId={todoId} />
      </div>
    </div>
  );
};

export default Board;
