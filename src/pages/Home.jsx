import React, { useState, useEffect } from "react";
import {
  getTodos,
  getItems,
  updateItem,
  moveTask,
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
      if (!task) {
        console.error("Task not found");
        return;
      }

      const currentTodoIndex = todos.findIndex(
        (todo) => todo.id === task.todo_id
      );
      if (currentTodoIndex === -1) {
        console.error("Current Todo not found");
        return;
      }

      if (currentTodoIndex > 0) {
        const newTodoId = todos[currentTodoIndex - 1].id;

        const result = await moveTask(task.todo_id, taskId, {
          target_todo_id: newTodoId,
        });

        if (result && result.error) {
          console.error("Failed to move task left", result.error);
        } else {
          setTasks(
            tasks.map((t) =>
              t.id === taskId ? { ...t, todo_id: newTodoId } : t
            )
          );
          alert("Task successfully moved to the previous Group!");
        }
      } else {
        console.error("No previous todo found to move task to");
      }
    } catch (error) {
      console.error("Failed to move task left", error);
    }
  };

  const handleMoveRight = async (taskId) => {
    try {
      const task = tasks.find((task) => task.id === taskId);
      if (!task) {
        console.error("Task not found");
        return;
      }

      const currentTodoIndex = todos.findIndex(
        (todo) => todo.id === task.todo_id
      );
      if (currentTodoIndex === -1) {
        console.error("Current Todo not found");
        return;
      }

      if (currentTodoIndex < todos.length - 1) {
        const newTodoId = todos[currentTodoIndex + 1].id;

        const result = await moveTask(task.todo_id, taskId, {
          target_todo_id: newTodoId,
        });

        if (result && result.error) {
          console.error("Failed to move task right", result.error);
        } else {
          setTasks(
            tasks.map((t) =>
              t.id === taskId ? { ...t, todo_id: newTodoId } : t
            )
          );
          alert("Task successfully moved to the next Group!");
        }
      } else {
        console.error("No next todo found to move task to");
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
      const task = tasks.find((task) => task.id === taskId);

      if (task) {
        const todoId = task.todo_id;
        if (!todoId) {
          console.error("Todo ID is undefined");
          return;
        }

        await deleteItem(todoId, taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {todos.map((todo) => (
            <Board
              key={todo.id}
              title={todo.title}
              descriptions={todo.description}
              tasks={tasks.filter((task) => task.todo_id === todo.id)}
              onMoveLeft={handleMoveLeft}
              onMoveRight={handleMoveRight}
              onEdit={handleEdit}
              onDelete={handleDelete}
              todoId={todo.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
