import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getTodos = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching todos:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch todos");
  }
};

export const createTodo = async (todo) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/todos`, todo, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating todo:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create todo");
  }
};

export const getItems = async (todoId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_BASE_URL}/todos/${todoId}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching items:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch items");
  }
};

export const createItem = async (todoId, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/todos/${todoId}/items`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating item:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create item");
  }
};

export const updateItem = async (todoId, itemId, updatedTask, targetTodoId) => {
  if (!todoId || !itemId || !targetTodoId) {
    throw new Error("todoId, itemId, and targetTodoId are required");
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/todos/${todoId}/items/${itemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...updatedTask, target_todo_id: targetTodoId }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", response.status, errorText);
      throw new Error("Failed to update item");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const moveTask = async (currentTodoId, taskId, updateData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/todos/${currentTodoId}/items/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in moveTask:", error);
    return { error: error.message };
  }
};

export const deleteItem = async (todoId, itemId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/todos/${todoId}/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Error deleting item:",
      error.response?.data || error.message
    );
    throw new Error("Failed to delete item");
  }
};
