import React from "react";
import Task from "./Task";

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
}) => {
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
        className="text-sm font-semibold mb-4 inline-block"
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
      <p className="mb-4 font-semibold">{descriptions}</p>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onMoveLeft={onMoveLeft}
          onMoveRight={onMoveRight}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Board;
