import React from "react";
import { IoWarningOutline } from "react-icons/io5";

const DeleteTaskModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <IoWarningOutline size={26} className="text-red-500" />
          <span className="font-bold">Delete Task</span>
        </h4>
        <p>
          Are you sure want to delete this task? Your action can’t be reverted.
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-white text-black border-2 border-slate-300 px-4 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
