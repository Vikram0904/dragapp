import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import AddTask from "./AddTask";

function Column({ colId, tasks, addTask, deleteTask, editTask }) {
  const [adding, setAdding] = useState(false);

  return (
    <Droppable droppableId={colId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            background: "#f4f4f4",
            padding: "15px",
            width: "30%",
            borderRadius: "8px",
            minHeight: "300px",
          }}
        >
          <h3 style={{ textTransform: "capitalize" }}>{colId}</h3>

          {tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              colId={colId}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}

          {provided.placeholder}

          {adding ? (
            <AddTask colId={colId} addTask={addTask} setAdding={setAdding} />
          ) : (
            <button
              onClick={() => setAdding(true)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "8px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              + Add Task
            </button>
          )}
        </div>
      )}
    </Droppable>
  );
}

export default Column;
