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

export const updateItem = async (todoId, itemId, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${API_BASE_URL}/todos/${todoId}/items/${itemId}`,
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
      "Error updating item:",
      error.response?.data || error.message
    );
    throw new Error("Failed to update item");
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
