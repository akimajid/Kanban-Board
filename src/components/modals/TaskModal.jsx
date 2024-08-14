import React, { useState } from "react";
import { createItem } from "../../api/todos";

const TaskModal = ({ isOpen, onClose, todoId }) => {
  const [taskName, setTaskName] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todoId) {
      console.error("Todo ID is not defined");
      return;
    }

    const progress = parseInt(progressPercentage, 10);

    if (isNaN(progress) || progress < 0 || progress > 100) {
      console.error("Progress percentage must be between 0 and 100");
      return;
    }

    try {
      const newTask = {
        name: taskName,
        progress_percentage: progress,
      };

      await createItem(todoId, newTask);

      window.location.reload();

      onClose();
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Task Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter task name..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="progress"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Progress Percentage
            </label>
            <input
              type="number"
              id="progress"
              value={progressPercentage}
              placeholder="Progress..."
              onChange={(e) => setProgressPercentage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-gray-800"
              min="0"
              max="100"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white text-xs px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#02939e] text-white hover:bg-white hover:text-[#02939e] hover:border hover:border-[#02939e] text-xs px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
