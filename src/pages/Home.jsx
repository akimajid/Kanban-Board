import React, { useState, useEffect } from "react";
import {
  getTodos,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../api/todos";
import Board from "../components/Board";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTodosAndItems = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);

        const allTasks = [];
        for (const todo of todosData) {
          const items = await getItems(todo.id);
          allTasks.push(...items);
        }
        setTasks(allTasks);
      } catch (error) {
        console.error("Failed to load todos and items", error);
      }
    };

    fetchTodosAndItems();
  }, []);

  const handleMoveLeft = async (taskId) => {
    try {
      const task = tasks.find((task) => task.id === taskId);
      const currentTodoIndex = todos.findIndex(
        (todo) => todo.id === task.todoId
      );

      if (currentTodoIndex > 0) {
        const newTodoId = todos[currentTodoIndex - 1].id;
        await updateItem(taskId, { todoId: newTodoId });
        setTasks(
          tasks.map((t) => (t.id === taskId ? { ...t, todoId: newTodoId } : t))
        );
      }
    } catch (error) {
      console.error("Failed to move task left", error);
    }
  };

  const handleMoveRight = async (taskId) => {
    try {
      const task = tasks.find((task) => task.id === taskId);
      const currentTodoIndex = todos.findIndex(
        (todo) => todo.id === task.todoId
      );

      if (currentTodoIndex < todos.length - 1) {
        const newTodoId = todos[currentTodoIndex + 1].id;
        await updateItem(taskId, { todoId: newTodoId });
        setTasks(
          tasks.map((t) => (t.id === taskId ? { ...t, todoId: newTodoId } : t))
        );
      }
    } catch (error) {
      console.error("Failed to move task right", error);
    }
  };

  const handleEdit = async (taskId, updatedData) => {
    try {
      await updateItem(taskId, updatedData);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedData } : task
        )
      );
    } catch (error) {
      console.error("Failed to edit task", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteItem(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-3 gap-4">
        {todos.map((todo) => (
          <Board
            key={todo.id}
            title={todo.title}
            tasks={tasks.filter((task) => task.todoId === todo.id)}
            onMoveLeft={handleMoveLeft}
            onMoveRight={handleMoveRight}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
