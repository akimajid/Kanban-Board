import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs"; // Import the three dots icon
import { FaCheckCircle } from "react-icons/fa"; // Import the check circle icon

const Task = ({ task, onMoveLeft, onMoveRight, onEdit, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-sm flex flex-col">
      <div className="mb-2">
        <h3 className="text-md font-semibold">{task.name}</h3>
        <p className="px-2 py-1">{task.description}</p>
      </div>

      <hr className="border-dashed border-t-2 border-gray-300 mb-2" />

      <div className="flex items-center justify-between relative">
        <div className="flex items-center flex-grow">
          <div className="h-3 bg-gray-300 rounded w-full">
            <div
              className={`h-full rounded ${
                task.progress_percentage === 100
                  ? "bg-green-700"
                  : "bg-[#02939e]"
              }`}
              style={{ width: `${task.progress_percentage}%` }}
            />
          </div>
          <div className="ml-4 text-gray-500 font-semibold text-md min-w-max">
            {task.progress_percentage === 100 ? (
              <FaCheckCircle size={20} className="text-green-700" />
            ) : (
              `${task.progress_percentage}%`
            )}
          </div>
        </div>
        <button
          onClick={toggleDropdown}
          className="ml-4 bg-white text-gray-700 p-2 rounded-md"
        >
          <BsThreeDots size={16} />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
            <button
              onClick={() => {
                onMoveLeft(task.id);
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Move Left
            </button>
            <button
              onClick={() => {
                onMoveRight(task.id);
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Move Right
            </button>
            <button
              onClick={() => {
                onEdit(task.id);
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(task.id);
                toggleDropdown();
              }}
              className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
