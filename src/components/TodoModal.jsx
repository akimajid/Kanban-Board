import React, { useState } from "react";
import { createTodo } from "../api/todos";
import { useAuth } from "../contexts/AuthContext";

const TodoModal = ({ isOpen, onClose }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const { authToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTodo = {
        title: todoTitle,
        description: todoDescription,
      };

      await createTodo(newTodo, authToken);

      window.location.reload();

      onClose();
    } catch (error) {
      console.error("Error creating todo:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create New Group
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Add title here..."
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={todoDescription}
              placeholder="Write descriptions here..."
              onChange={(e) => setTodoDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-gray-800"
              rows="4"
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
              className="bg-[#02939e] hover:bg-white hover:text-[#02939e] hover:border hover:border-[#02939e] text-xs px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
